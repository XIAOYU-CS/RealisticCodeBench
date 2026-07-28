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