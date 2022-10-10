import { Routes, Route, Navigate, useNavigate } from 'react-router-native';

import {
  useFirebaseMessaging,
  useFirebaseBootstrap,
  useCheckWaterNotifications,
} from '@features/Notifications';

import Authentication from '@app/modules/Authentication';
import Settings from '@app/modules/Settings';
import HealthAssessment from '@app/modules/HealthAssessment';
import ReferralQuestionnaire from '@app/modules/ReferralQuestionnaire';
import ContentGallery from '@app/modules/ContentGallery';
import MyWellnessJourney from '@app/modules/MyWellnessJourney';
import HealthRecord from '@app/modules/HealthRecord';
import LifestyleTracker from '@app/modules/LifestyleTracker';
import Food from '@app/modules/Food';
import Home from '@app/modules/Home';
import Notifications from '@app/modules/Notifications';

import { useLocalNotifications } from '@app/hooks';
import { PatternBackground, ImageBackground } from '@app/components';
import { ProtectedRoute, SubscriptionCheck } from '@app/utils/components';

import { useDeepLinking, useAuth, useAndroidBackButton, useOfflineActions } from './hooks';
import { Onboarding, Paywall, OpenSourceUsed } from './screens';

import Layout from './Layout';
import DefaultRoute from './DefaultRoute';

export default function () {
  const { user } = useAuth();

  const { isAssessmentPassed, isQuestionnairePassed } = user ?? {};

  const navigate = useNavigate();

  useDeepLinking();
  useFirebaseBootstrap();
  useFirebaseMessaging();
  useLocalNotifications();
  useAndroidBackButton(() => navigate(-1));
  useOfflineActions();
  useCheckWaterNotifications(!!user);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<DefaultRoute />} />

        <Route element={<ImageBackground />}>
          <Route path="public/*" element={<Authentication />} />
        </Route>

        <Route element={<PatternBackground />}>
          <Route path="public/onboarding" element={<Onboarding />} />
          <Route path="public/paywall" element={<Paywall />} />
          <Route path="public/licenses" element={<OpenSourceUsed />} />
        </Route>

        <Route path="private" element={<ProtectedRoute />}>
          <Route element={<SubscriptionCheck />}>
            <Route element={<PatternBackground />}>
              {!isQuestionnairePassed && (
                <Route index element={<Navigate to="referral-questions" replace />} />
              )}

              {!isAssessmentPassed && (
                <Route index element={<Navigate to="health-assessment" replace />} />
              )}

              <Route index element={<Navigate to="home" replace />} />

              <Route path="referral-questions/*" element={<ReferralQuestionnaire />} />

              <Route path="health-assessment/*" element={<HealthAssessment />} />

              <Route path="settings/*" element={<Settings />} />

              <Route path="content-gallery/*" element={<ContentGallery />} />

              <Route path="health-record/*" element={<HealthRecord />} />

              <Route path="my-wellness-journey/*" element={<MyWellnessJourney />} />

              <Route path="lifestyle-tracker/*" element={<LifestyleTracker />} />

              <Route path="food/*" element={<Food />} />

              <Route path="home/*" element={<Home />} />

              <Route path="notifications/*" element={<Notifications />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
