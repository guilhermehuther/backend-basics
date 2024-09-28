from fastapi import APIRouter

from routes.users import router as user_router

router = APIRouter(
    prefix="/api"
)

router.include_router(
    router=user_router,
    prefix="/users",
    tags=["users"]
)