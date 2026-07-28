package org.real.temp;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Answer {
    public static Map<String, String> parseXamlToDict(String xamlFile) {
        Map<String, String> result = new HashMap<>();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new File(xamlFile));
            NodeList strings = document.getElementsByTagName("String");

            for (int i = 0; i < strings.getLength(); i++) {
                Element element = (Element) strings.item(i);
                String key = element.getAttribute("Key");
                if (!key.isEmpty()) {
                    result.put(key, element.getTextContent());
                }
            }
        } catch (ParserConfigurationException | SAXException | IOException e) {
            return new HashMap<>();
        }

        return result;
    }
}
