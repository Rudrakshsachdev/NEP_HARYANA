from django.urls import path
from .views import ScoringCalculateView, NominationScoreView

urlpatterns = [
    path('scoring/calculate/', ScoringCalculateView.as_view(), name='scoring-calculate'),
    path('scoring/my-score/', NominationScoreView.as_view(), name='scoring-my-score'),
]

