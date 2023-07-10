from functools import wraps

from channels.db import database_sync_to_async


def create_payload(action: str,
                   data=None,
                   errors=None,
                   status=200,
                   request_id=None):
    if errors is None:
        errors = []

    return {
        "type": action,
        "errors": errors,
        "data": data,
        "action": action,
        "response_status": status,
        "request_id": request_id,
    }


def force_database_sync_to_async(func):
    @wraps(func)
    def inner(*args, **kwargs):
        queryset = func(*args, **kwargs)
        return list(queryset)

    return database_sync_to_async(inner)
