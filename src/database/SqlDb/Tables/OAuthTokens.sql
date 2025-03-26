﻿CREATE TABLE [dbo].[OAuthTokens]
(
	[ID] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [UniqueID] NVARCHAR(40) UNIQUE NOT NULL,
    [UserID] INT NOT NULL,
    [ClientID] INT NOT NULL,
    [AccessToken] NVARCHAR(512) UNIQUE NOT NULL,
    [RefreshToken] NVARCHAR(512) UNIQUE NOT NULL,
    [Expiry] DATETIME2 NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ClientID) REFERENCES OAuthClients(ID),
    [ValidFrom] DATETIME2 GENERATED ALWAYS AS ROW START,
    [ValidTo] DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME ([ValidFrom], [ValidTo])
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[OAuthTokensHistory]))