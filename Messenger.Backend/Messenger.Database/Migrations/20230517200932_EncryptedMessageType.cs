using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger.Database.Migrations
{
    public partial class EncryptedMessageType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EncryptedText",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "EncryptedText",
                table: "Messages",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
