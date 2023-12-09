from django.urls import path

from api.controllers.book_controller import book_get
from api.controllers.book_controller import book_get_id
from api.controllers.book_controller import book_post
from api.controllers.book_controller import book_put
from api.controllers.book_controller import book_delete

# specify URL Path for rest_framework
urlpatterns = [
    #path('', include(router.urls)),
    #path('api/', include('rest_framework.urls'))

    path('items/', book_get),
    path('item/', book_post),
    path('item/<int:pk>/', book_get_id),
    path('item/<int:pk>/update/', book_put),
    path('item/<int:pk>/delete/', book_delete),

]