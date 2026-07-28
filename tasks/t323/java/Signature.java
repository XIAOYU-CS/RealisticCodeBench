public static final int SIGMA0 = 0;

public static class Trans {
    public final int nxt;
    public final int dir;
    public final int out;

    public Trans(int nxt, int dir, int out) {}
}

public static class ListES {
    public final java.util.List<Integer> l;
    public final java.util.List<Integer> r;
    public final int m;
    public final int s;

    public ListES(java.util.List<Integer> l, java.util.List<Integer> r, int m, int s) {}
}

public static ListES listESStepPrime(Trans tr, ListES x) {}

public static ListES ListESStepPrime(Trans tr, ListES x) {}
