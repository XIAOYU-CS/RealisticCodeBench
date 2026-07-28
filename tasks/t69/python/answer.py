import inspect
from typing import Callable, List, Any

def check_method_arg_types(method_obj: Callable, *args, **kwargs) -> None:
    """
    Checks that the arguments passed to a given method object comply with their
    expected types, based on the method's signature. If there's a discrepancy,
    it raises a ValueError.

    Args:
        method_obj (Callable): The method for which arguments are checked.
        *args: Positional arguments passed to the method.
        **kwargs: Keyword arguments passed to the method.

    Raises:
        ValueError: If any argument doesn't match its expected type.
    """
    # Extract the list of parameters to exclude from the type check
    exclude = kwargs.pop('exclude', [])
    # Create a new list to avoid modifying the original
    exclude_list = list(exclude) + ['self']

    # Get the signature of the method
    args_signature = inspect.signature(method_obj)
    bound_args = args_signature.bind(*args, **kwargs)
    bound_args.apply_defaults()

    expected_types = {
        param.name: param.annotation for param in args_signature.parameters.values()
        if param.name not in exclude_list and param.annotation is not inspect.Parameter.empty
    }

    # Check each argument against its expected type
    for arg_name, arg_type in expected_types.items():
        if arg_name in bound_args.arguments:
            actual_value = bound_args.arguments[arg_name]
            if not isinstance(actual_value, arg_type):
                passed_arg_type = type(actual_value).__name__
                expected_arg_type = getattr(arg_type, '__name__', str(arg_type))
                raise ValueError(
                    f"{arg_name} should be of type {expected_arg_type}, "
                    f"but got type {passed_arg_type} instead."
                )