package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {
    
    @Test
    public void testBasicTreeStructureBuilding() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> page1 = new HashMap<>();
        page1.put("id", 1);
        page1.put("parentFolder", null);
        page1.put("name", "Root");
        
        Map<String, Object> page2 = new HashMap<>();
        page2.put("id", 2);
        page2.put("parentFolder", 1);
        page2.put("name", "Child 1");
        
        Map<String, Object> page3 = new HashMap<>();
        page3.put("id", 3);
        page3.put("parentFolder", 1);
        page3.put("name", "Child 2");
        
        Map<String, Object> page4 = new HashMap<>();
        page4.put("id", 4);
        page4.put("parentFolder", 2);
        page4.put("name", "Grandchild 1");
        
        pages.add(page1);
        pages.add(page2);
        pages.add(page3);
        pages.add(page4);
        
        List<Answer.Node> result = Answer.buildTreeWithSort(pages);
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals("Root", result.get(0).getData().get("name"));
        assertEquals(2, result.get(0).getItems().size());
        assertEquals(2, result.get(0).getItems().get(0).getId());
        assertEquals("Child 1", result.get(0).getItems().get(0).getData().get("name"));
        assertEquals(1, result.get(0).getItems().get(0).getItems().size());
        assertEquals(4, result.get(0).getItems().get(0).getItems().get(0).getId());
        assertEquals(3, result.get(0).getItems().get(1).getId());
        assertEquals("Child 2", result.get(0).getItems().get(1).getData().get("name"));
        assertEquals(0, result.get(0).getItems().get(1).getItems().size());
    }
    
    @Test
    public void testMultipleRootNodes() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> page1 = new HashMap<>();
        page1.put("id", 1);
        page1.put("parentFolder", null);
        page1.put("name", "Root 1");
        
        Map<String, Object> page2 = new HashMap<>();
        page2.put("id", 2);
        page2.put("parentFolder", null);
        page2.put("name", "Root 2");
        
        Map<String, Object> page3 = new HashMap<>();
        page3.put("id", 3);
        page3.put("parentFolder", 1);
        page3.put("name", "Child of Root 1");
        
        Map<String, Object> page4 = new HashMap<>();
        page4.put("id", 4);
        page4.put("parentFolder", 2);
        page4.put("name", "Child of Root 2");
        
        pages.add(page1);
        pages.add(page2);
        pages.add(page3);
        pages.add(page4);
        
        List<Answer.Node> result = Answer.buildTreeWithSort(pages);
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals("Root 1", result.get(0).getData().get("name"));
        assertEquals(2, result.get(1).getId());
        assertEquals("Root 2", result.get(1).getData().get("name"));
        assertEquals(1, result.get(0).getItems().size());
        assertEquals(1, result.get(1).getItems().size());
        assertEquals(3, result.get(0).getItems().get(0).getId());
        assertEquals(4, result.get(1).getItems().get(0).getId());
    }
    
    @Test
    public void testSortingFunctionality() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> page1 = new HashMap<>();
        page1.put("id", 1);
        page1.put("parentFolder", null);
        page1.put("name", "Z Root");
        page1.put("order", 2);
        
        Map<String, Object> page2 = new HashMap<>();
        page2.put("id", 2);
        page2.put("parentFolder", null);
        page2.put("name", "A Root");
        page2.put("order", 1);
        
        Map<String, Object> page3 = new HashMap<>();
        page3.put("id", 3);
        page3.put("parentFolder", 1);
        page3.put("name", "Z Child");
        page3.put("order", 2);
        
        Map<String, Object> page4 = new HashMap<>();
        page4.put("id", 4);
        page4.put("parentFolder", 1);
        page4.put("name", "A Child");
        page4.put("order", 1);
        
        Map<String, Object> page5 = new HashMap<>();
        page5.put("id", 5);
        page5.put("parentFolder", 2);
        page5.put("name", "B Child");
        page5.put("order", 1);
        
        pages.add(page1);
        pages.add(page2);
        pages.add(page3);
        pages.add(page4);
        pages.add(page5);
        
        List<Answer.Node> resultByName = Answer.buildTreeWithSort(pages, (a, b) -> {
            String nameA = (String) a.getData().get("name");
            String nameB = (String) b.getData().get("name");
            return nameA.compareTo(nameB);
        });
        
        assertEquals("A Root", resultByName.get(0).getData().get("name"));
        assertEquals("Z Root", resultByName.get(1).getData().get("name"));
        assertEquals("A Child", resultByName.get(1).getItems().get(0).getData().get("name"));
        assertEquals("Z Child", resultByName.get(1).getItems().get(1).getData().get("name"));
        assertEquals("B Child", resultByName.get(0).getItems().get(0).getData().get("name"));
        
        List<Answer.Node> resultByOrder = Answer.buildTreeWithSort(pages, (a, b) -> {
            Integer orderA = (Integer) a.getData().get("order");
            Integer orderB = (Integer) b.getData().get("order");
            return orderA.compareTo(orderB);
        });
        
        assertEquals("A Root", resultByOrder.get(0).getData().get("name"));
        assertEquals("Z Root", resultByOrder.get(1).getData().get("name"));
    }
    
    @Test
    public void testEmptyAndEdgeCases() {
        List<Answer.Node> result = Answer.buildTreeWithSort(new ArrayList<>());
        assertEquals(0, result.size());
        
        List<Map<String, Object>> rootOnlyPages = new ArrayList<>();
        Map<String, Object> page1 = new HashMap<>();
        page1.put("id", 1);
        page1.put("parentFolder", null);
        page1.put("name", "Root 1");
        
        Map<String, Object> page2 = new HashMap<>();
        page2.put("id", 2);
        page2.put("parentFolder", null);
        page2.put("name", "Root 2");
        
        rootOnlyPages.add(page1);
        rootOnlyPages.add(page2);
        
        result = Answer.buildTreeWithSort(rootOnlyPages);
        assertEquals(2, result.size());
        assertEquals(0, result.get(0).getItems().size());
        assertEquals(0, result.get(1).getItems().size());
        
        List<Map<String, Object>> pagesWithOrphans = new ArrayList<>();
        Map<String, Object> page3 = new HashMap<>();
        page3.put("id", 1);
        page3.put("parentFolder", null);
        page3.put("name", "Root");
        
        Map<String, Object> page4 = new HashMap<>();
        page4.put("id", 2);
        page4.put("parentFolder", 999);
        page4.put("name", "Orphan");
        
        Map<String, Object> page5 = new HashMap<>();
        page5.put("id", 3);
        page5.put("parentFolder", 1);
        page5.put("name", "Valid Child");
        
        pagesWithOrphans.add(page3);
        pagesWithOrphans.add(page4);
        pagesWithOrphans.add(page5);
        
        result = Answer.buildTreeWithSort(pagesWithOrphans);
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getItems().size());
        assertEquals("Valid Child", result.get(0).getItems().get(0).getData().get("name"));
    }
    
    @Test(expected = Exception.class)
    public void testInputValidationAndErrorHandling1() {
        Answer.buildTreeWithSort(null);
    }
    
    @Test(expected = Exception.class)
    public void testInputValidationAndErrorHandling2() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> invalidPage = null;
        pages.add(invalidPage);
        Answer.buildTreeWithSort(pages);
    }
    
    @Test(expected = Exception.class)
    public void testInputValidationAndErrorHandling3() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> page = new HashMap<>();
        page.put("name", "No ID");
        pages.add(page);
        Answer.buildTreeWithSort(pages);
    }
    
    @Test(expected = Exception.class)
    public void testInputValidationAndErrorHandling4() {
        List<Map<String, Object>> pages = new ArrayList<>();
        Map<String, Object> page = new HashMap<>();
        page.put("id", null);
        page.put("name", "Undefined ID");
        pages.add(page);
        Answer.buildTreeWithSort(pages);
    }
    
    @Test
    public void testInputValidationAndErrorHandling5() {
        List<Map<String, Object>> validPages = new ArrayList<>();
        Map<String, Object> page1 = new HashMap<>();
        page1.put("id", 1);
        page1.put("name", "Page 1");
        Map<String, Object> page2 = new HashMap<>();
        page2.put("id", 2);
        page2.put("name", "Page 2");
        validPages.add(page1);
        validPages.add(page2);
        List<Answer.Node> result = Answer.buildTreeWithSort(validPages);
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals(2, result.get(1).getId());
        assertEquals(0, result.get(0).getItems().size());
        assertEquals(0, result.get(1).getItems().size());
    }
}