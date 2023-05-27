using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger.Database.Migrations
{
    public partial class RoomEncType_SeenMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AllSeen",
                table: "Messages",
                newName: "IsSeen");

            migrationBuilder.AddColumn<int>(
                name: "TypeEncryption",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeEncryption",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "IsSeen",
                table: "Messages",
                newName: "AllSeen");
        }
    }
}
