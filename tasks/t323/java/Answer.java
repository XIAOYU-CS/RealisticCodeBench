package org.real.temp;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Answer {
    public static final int SIGMA0 = 0;

    public static class Trans {
        public final int nxt;
        public final int dir;
        public final int out;

        public Trans(int nxt, int dir, int out) {
            this.nxt = nxt;
            this.dir = dir;
            this.out = out;
        }
    }

    public static class ListES {
        public final List<Integer> l;
        public final List<Integer> r;
        public final int m;
        public final int s;

        public ListES(List<Integer> l, List<Integer> r, int m, int s) {
            this.l = new ArrayList<>(l);
            this.r = new ArrayList<>(r);
            this.m = m;
            this.s = s;
        }

        @Override
        public boolean equals(Object other) {
            if (this == other) {
                return true;
            }
            if (!(other instanceof ListES)) {
                return false;
            }
            ListES that = (ListES) other;
            return m == that.m && s == that.s && l.equals(that.l) && r.equals(that.r);
        }

        @Override
        public int hashCode() {
            return Objects.hash(l, r, m, s);
        }
    }

    public static ListES listESStepPrime(Trans tr, ListES x) {
        if (tr.dir > 0) {
            List<Integer> newLeft = prepend(tr.out, x.l);
            if (x.r.isEmpty()) {
                return new ListES(newLeft, new ArrayList<Integer>(), SIGMA0, tr.nxt);
            }
            return new ListES(newLeft, x.r.subList(1, x.r.size()), x.r.get(0), tr.nxt);
        }

        if (tr.dir < 0) {
            List<Integer> newRight = prepend(tr.out, x.r);
            if (x.l.isEmpty()) {
                return new ListES(new ArrayList<Integer>(), newRight, SIGMA0, tr.nxt);
            }
            return new ListES(x.l.subList(1, x.l.size()), newRight, x.l.get(0), tr.nxt);
        }

        return new ListES(x.l, x.r, tr.out, tr.nxt);
    }

    public static ListES ListESStepPrime(Trans tr, ListES x) {
        return listESStepPrime(tr, x);
    }

    private static List<Integer> prepend(int value, List<Integer> tail) {
        List<Integer> result = new ArrayList<>(tail.size() + 1);
        result.add(value);
        result.addAll(tail);
        return result;
    }
}
