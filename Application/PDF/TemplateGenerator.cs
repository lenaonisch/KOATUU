using Domain;
using System.Collections.Generic;
using System.Text;

namespace Application.PDF
{
    public class TemplateGenerator
    {
        public static string GetHTMLString(string header, IList<Locality> localities)
        {
            var sb = new StringBuilder();
            sb.AppendFormat(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <div class='header'><h1>{0}</h1></div>
                                <table align='center'>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                    </tr>", header);

            foreach (var locality in localities)
            {
                sb.AppendFormat(@"<tr>
                                    <td>{0}</td>
                                    <td>{1}</td>
                                    <td>{2}</td>
                                  </tr>", locality.Id, locality.LocalityName, locality.Category);
            }

            sb.Append(@"
                                </table>
                            </body>
                        </html>");

            return sb.ToString();
        }
    }
}
