using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Localities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Category = table.Column<char>(nullable: true),
                    ParentId = table.Column<long>(nullable: true)
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
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 1L, null, null, "Title1" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 2L, null, null, "Title2" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 11L, 'С', 1L, "Child11" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 12L, 'Щ', 1L, "Child12" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 21L, 'Т', 2L, "Child21" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 22L, 'С', 2L, "Child22" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "ParentId", "Title" },
                values: new object[] { 111L, null, 11L, "Child111" });

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
