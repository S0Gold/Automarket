using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoMarket.Migrations
{
    public partial class AddLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VerificationCode",
                table: "Users",
                type: "varchar(256)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(256)");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Announcements",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Announcements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Announcements",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Announcements");

            migrationBuilder.AlterColumn<string>(
                name: "VerificationCode",
                table: "Users",
                type: "varchar(256)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(256)",
                oldNullable: true);
        }
    }
}
