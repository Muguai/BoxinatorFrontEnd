
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FirebaseAdmin;

namespace AuthenticationTest.Authentication
{
    public class FirebaseAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private const string BEARER_PREFIX = "Bearer ";
        private readonly FirebaseApp _firebaseApp;
        public FirebaseAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, FirebaseApp firebaseApp) : base(options, logger, encoder, clock)
        {
            _firebaseApp = firebaseApp;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Context.Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.NoResult();
            }

            string bearerToken = Context.Request.Headers["Authorization"];

            if(bearerToken != null && !bearerToken.StartsWith(BEARER_PREFIX))
            {
                return AuthenticateResult.Fail("Invalid Scheme");
            }

            string token = bearerToken.Substring(BEARER_PREFIX.Length);

            try
            {
                FirebaseToken firebaseToken = await FirebaseAuth.GetAuth(_firebaseApp).VerifyIdTokenAsync(token);

                return AuthenticateResult.Success(CreateAuthenticationTicket(firebaseToken));
            }
            catch (Exception ex)
            {
                return AuthenticateResult.Fail(ex);
            }


        }

        private AuthenticationTicket CreateAuthenticationTicket(FirebaseToken firebaseToken)
        {
            ClaimsPrincipal claimsPrincipal = new System.Security.Claims.ClaimsPrincipal(new List<ClaimsIdentity>()
            {
                new ClaimsIdentity(ToClaims(firebaseToken.Claims), nameof(FirebaseAuthenticationHandler))
            });

            return new AuthenticationTicket(claimsPrincipal, JwtBearerDefaults.AuthenticationScheme);
        }

        private IEnumerable<Claim>? ToClaims(IReadOnlyDictionary<string, object> claims)
        {
            return new List<Claim>
            {
                new Claim("id", claims["user_id"].ToString()),
                new Claim("email", claims["email"].ToString()),
                new Claim("name", claims["name"].ToString())
            };
        }
    }
}
