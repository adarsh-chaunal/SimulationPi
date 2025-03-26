CREATE PROCEDURE [dbo].[usp_ManagePlot]
    @operationType VARCHAR(10) NOT NULL,
    @id INT NULL,
    @uniqueID VARCHAR(255) NULL,
	@plot_FileID INT NULL,
    @name NVARCHAR(255) NULL,
    @description NVARCHAR(MAX) NULL,
    @displayOrder INT NULL,
    @createdAt DATETIME2 NULL,
    @createdBy VARCHAR(40) NULL,
    @lastModifiedAt DATETIME2 NULL,
    @lastModifiedBy VARCHAR(40) NULL,
    @isActive BIT = 1,
    @isArchived BIT = 0,
    @statusMessage NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF @operationType NOT IN ('SELECT_ALL', 'SELECT', 'INSERT', 'UPDATE', 'DELETE')
        BEGIN
            SET @statusMessage = CONCAT(@operationType, 'is an invalid operation type.');
            THROW 51000, @statusMessage, 1;
        END

        IF (@operationType = 'SELECT_ALL')
        BEGIN
            SELECT * 
            FROM Plot
            WHERE IsActive = @isActive and IsArchived = @isArchived;
        END

        ELSE IF (@operationType = 'SELECT')
        BEGIN
            SELECT * 
            FROM Plot
            WHERE IsActive = @isActive and IsArchived = @isArchived and UniqueID = @uniqueID;
        END

        ELSE IF (@operationType = 'INSERT')
        BEGIN
            INSERT INTO Plot (
                UniqueID, 
                Name, 
                Description, 
                DisplayOrder, 
                CreatedAt, 
                CreatedBy, 
                LastModifiedAt, 
                LastModifiedBy, 
                IsActive, 
                IsArchived)
            VALUES (
                @uniqueID,
                @name,
                @description,
                @displayOrder,
                @createdAt,
                @createdBy,
                @lastModifiedAt,
                @lastModifiedBy,
                @isActive,
                @isArchived);

            SET @statusMessage = 'INSERTED';
        END

        ELSE IF (@operationType = 'UPDATE')
        BEGIN
            UPDATE Plot
            SET Name = @name,
                Description = @description,
                DisplayOrder = @displayOrder,
                LastModifiedAt = @lastModifiedAt,
                LastModifiedBy = @lastModifiedBy,
                IsActive = @isActive
            WHERE UniqueID = @uniqueID;

            SET @statusMessage = 'UPDATED';
        END

        ELSE IF (@operationType = 'DELETE')
        BEGIN
            UPDATE Plot
            SET IsArchived = @isArchived,
                LastModifiedAt = @lastModifiedAt,
                LastModifiedBy = @lastModifiedBy
            WHERE UniqueID = @uniqueID;

            SET @statusMessage = 'DELETED';
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
        BEGIN 
            ROLLBACK TRANSACTION;
        END
            DECLARE @ErrorMessage NVARCHAR(MAX) = CONCAT('Error ', ERROR_NUMBER(),': ', ERROR_MESSAGE());
            DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
            DECLARE @ErrorState INT = ERROR_STATE();

            SET @statusMessage = @ErrorMessage;
            -- RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END