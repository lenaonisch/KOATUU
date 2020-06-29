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
                    Id = table.Column<long>(nullable: false),
                    LocalityName = table.Column<string>(nullable: true),
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
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 1L, null, "Title1", null });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 2L, null, "Title2", null });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 11L, 'С', "Child11", 1L });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 12L, 'Щ', "Child12", 1L });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 21L, 'Т', "Child21", 2L });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 22L, 'С', "Child22", 2L });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "LocalityName", "ParentId" },
                values: new object[] { 111L, null, "Child111", 11L });

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
