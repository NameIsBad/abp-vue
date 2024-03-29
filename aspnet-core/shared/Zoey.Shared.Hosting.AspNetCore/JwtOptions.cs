﻿using Microsoft.IdentityModel.Tokens;
using System;

namespace Zoey.Shared.Hosting.AspNetCore;

public class JwtOptions
{
    public SymmetricSecurityKey SecurityKey { get; set; }

    public string Issuer { get; set; }

    public string Audience { get; set; }

    public SigningCredentials SigningCredentials { get; set; }

    public TimeSpan Expiration { get; set; }
}