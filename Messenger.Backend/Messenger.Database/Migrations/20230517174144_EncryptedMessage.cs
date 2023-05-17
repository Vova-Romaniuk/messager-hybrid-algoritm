using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger.Database.Migrations
{
    public partial class EncryptedMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Messages");

            migrationBuilder.AddColumn<byte[]>(
                name: "EncryptedText",
                table: "Messages",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PrivateKey",
                table: "Messages",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PublicKey",
                table: "Messages",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EncryptedText",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "PrivateKey",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "PublicKey",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
