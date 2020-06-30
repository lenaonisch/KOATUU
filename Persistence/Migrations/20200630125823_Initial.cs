using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Localities",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    LocalityName = table.Column<string>(nullable: true),
                    Category = table.Column<char>(nullable: true),
                    ParentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Localities_Localities_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0100000000", null, "Title1", null });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0200000000", null, "Title2", null });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0100100000", 'С', "Child11", "0100000000" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0100200000", 'Щ', "Child12", "0100000000" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0200100000", 'Т', "Child21", "0200000000" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0200200000", 'С', "Child22", "0200000000" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { "0100100100", null, "Child111", "0100100000" });

            migrationBuilder.CreateIndex(
                name: "IX_Localities_ParentId",
                table: "Localities",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Localities");
        }
    }
}
