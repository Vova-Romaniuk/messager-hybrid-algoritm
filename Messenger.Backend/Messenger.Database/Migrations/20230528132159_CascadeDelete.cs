using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger.Database.Migrations
{
    public partial class CascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
