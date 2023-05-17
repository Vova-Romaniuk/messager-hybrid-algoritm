using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger.Database.Migrations
{
    public partial class RemoveTitleAndImageForRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Images_ImageId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_ImageId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Rooms");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Rooms",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ImageId",
                table: "Rooms",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Images_ImageId",
                table: "Rooms",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
