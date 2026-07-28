import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.ArrayList;
import java.util.List;

public class Answer {
    public static List<List<String>> extractHtmlWaffleTableToCsvData(Document document) {
        List<List<String>> result = new ArrayList<>();
        Element table = document.selectFirst("table.waffle");

        if (table == null) {
            return result;
        }

        for (Element row : table.select("tbody tr")) {
            List<String> rowData = new ArrayList<>();
            for (Element cell : row.select("td")) {
                rowData.add(cell.text().trim());
            }
            result.add(rowData);
        }

        return result;
    }
}
