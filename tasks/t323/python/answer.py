import logging
from dataclasses import dataclass
from typing import List

logging.basicConfig(
    level=logging.DEBUG,
    format="%(message)s"
)

Σ = int
Σ0: Σ = 0
St = int
Dir = int


@dataclass
class Trans:
    """Turing machine transition rule"""
    nxt: St
    dir: Dir  # Movement direction
    out: Σ  # Output symbol


@dataclass
class ListES:
    l: List[Σ]  # Left tape
    r: List[Σ]  # Right tape
    m: Σ  # Current symbol
    s: St  # Current state


def list_es_step_prime(tr: Trans, x: ListES) -> ListES:
    """
    Execute a single step of the Turing machine, update configuration according to
    transition rules and output logs.

    Args:
        tr: Transition rule
        x: Current configuration

    Returns:
        New configuration
    """
    logging.debug(f"Current config: left={x.l}, right={x.r}, current symbol={x.m}, state={x.s}")
    logging.debug(f"Transition rule: next state={tr.nxt}, direction={tr.dir}, write symbol={tr.out}")

    l0, r0, m0, s0 = x.l, x.r, x.m, x.s
    s1, d, o = tr.nxt, tr.dir, tr.out
    new_config = None

    if d > 0:  # Move right
        if r0:
            m1, *r1 = r0
            new_config = ListES(l=[o] + l0, r=r1, m=m1, s=s1)
        else:
            new_config = ListES(l=[o] + l0, r=[], m=Σ0, s=s1)

    elif d < 0:  # Move left
        if l0:
            m1, *l1 = l0
            new_config = ListES(l=l1, r=[o] + r0, m=m1, s=s1)
        else:
            new_config = ListES(l=[], r=[o] + r0, m=Σ0, s=s1)

    else:  # No movement
        new_config = ListES(l=l0, r=r0, m=o, s=s1)

    logging.debug(
        f"New config: left={new_config.l}, right={new_config.r}, current symbol={new_config.m}, state={new_config.s}\n")
    return new_config