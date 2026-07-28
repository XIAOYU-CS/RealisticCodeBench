import java.util.*;

public class Answer {
    public static List<Integer> topologicalSortDFS(List<Integer> vertices, List<List<Integer>> edges) {
        Map<Integer, List<Integer>> adjacencyList = new HashMap<>();
        for(int v : vertices){
            adjacencyList.put(v, new ArrayList<>());
        }
        for(List<Integer> e : edges){
            adjacencyList.get(e.get(0)).add(e.get(1));
        }

        Stack<Integer> stack = new Stack<>();
        Set<Integer> visited = new HashSet<>();
        Set<Integer> visiting = new HashSet<>();
        for(int vertex : vertices){
            if(!visited.contains(vertex)){
                if(!dfs(adjacencyList, visited, visiting, vertex, stack)){
                    return Collections.emptyList();
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()){
            result.add(stack.pop());
        }

        return result;
    }

    private static boolean dfs(Map<Integer, List<Integer>> adjacencyList, Set<Integer> visited, Set<Integer> visiting, int current, Stack<Integer> stack){
        if(visiting.contains(current)){
            return false;
        }
        if(visited.contains(current)){
            return true;
        }
        visiting.add(current);
        visited.add(current);
        for(int neighbor : adjacencyList.get(current)){
            if(!dfs(adjacencyList, visited, visiting, neighbor, stack)){
                return false;
            }
        }
        visiting.remove(current);
        stack.push(current);
        return true;
    }
}
