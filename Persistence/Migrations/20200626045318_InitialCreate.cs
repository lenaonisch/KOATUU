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
                    Category = table.Column<char>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocalityNodes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ParentId = table.Column<long>(nullable: true),
                    ChildId = table.Column<long>(nullable: true),
                    Separation = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalityNodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LocalityNodes_Localities_ChildId",
                        column: x => x.ChildId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LocalityNodes_Localities_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Localities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 1L, null, "Title1" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 11L, 'С', "Child11" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 111L, null, "Child111" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 12L, 'Щ', "Child12" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 2L, null, "Title2" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 21L, 'Т', "Child21" });

            migrationBuilder.InsertData(
                table: "Localities",
                columns: new[] { "Id", "Category", "Title" },
                values: new object[] { 22L, 'С', "Child22" });

            migrationBuilder.InsertData(
                table: "LocalityNodes",
                columns: new[] { "Id", "ChildId", "ParentId", "Separation" },
                values: new object[] { 1L, 11L, 1L, 0 });

            migrationBuilder.InsertData(
                table: "LocalityNodes",
                columns: new[] { "Id", "ChildId", "ParentId", "Separation" },
                values: new object[] { 3L, 111L, 11L, 0 });

            migrationBuilder.InsertData(
                table: "LocalityNodes",
                columns: new[] { "Id", "ChildId", "ParentId", "Separation" },
                values: new object[] { 2L, 12L, 1L, 0 });

            migrationBuilder.InsertData(
                table: "LocalityNodes",
                columns: new[] { "Id", "ChildId", "ParentId", "Separation" },
                values: new object[] { 4L, 21L, 2L, 0 });

            migrationBuilder.InsertData(
                table: "LocalityNodes",
                columns: new[] { "Id", "ChildId", "ParentId", "Separation" },
                values: new object[] { 5L, 22L, 2L, 0 });

            migrationBuilder.CreateIndex(
                name: "IX_LocalityNodes_ChildId",
                table: "LocalityNodes",
                column: "ChildId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LocalityNodes_ParentId",
                table: "LocalityNodes",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LocalityNodes");

            migrationBuilder.DropTable(
                name: "Localities");
        }
    }
}
