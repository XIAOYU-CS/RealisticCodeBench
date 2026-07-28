/**
* List files and folders in the specified directory or current directory with sorting support
*
* @param directory Optional parameter, specifies the directory path to list. If null, lists current directory
* @param sortBy Sorting method, options: "name" (by name), "size" (by size), "mtime" (by modification time)
* @param reverse Whether to sort in reverse order, default false (ascending)
* @return Tuple (boolean, String): First element indicates success, second element is the result string
*/
public static Tuple<Boolean, String> commandLs(String directory, String sortBy, boolean reverse) {}