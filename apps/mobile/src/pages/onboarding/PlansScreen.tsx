import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ChevronLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react-native';
import {
  useOnboardingStore,
  type AccountType,
  type BillingCycle,
} from '../../core/store/onboarding';
import { cn } from '../../design-system/ui/utils/cn';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  isCustom?: boolean;
  features: PlanFeature[];
}

const INDIVIDUAL_PLANS: PlanOption[] = [
  {
    id: 'individual-preview',
    name: 'Free Preview',
    description: 'Basic access to quarterly headline indices and summary metrics.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { text: 'Published Phoenix headline indices', included: true },
      { text: 'Latest report overview summaries', included: true },
    ],
  },
  {
    id: 'individual-pro',
    name: 'Costly Pro',
    badge: 'Most Popular',
    description: 'Complete commercial cost intelligence and lead times for Phoenix.',
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      { text: 'Full Phoenix Quarterly Cost Series (QoQ deltas)', included: true },
      { text: 'Shell & Site detailed cost points (50k-1.2M SF)', included: true },
      { text: 'Tenant Improvements (Office, HVAC, Lighting)', included: true },
      { text: 'Material lead-time clock from submittal approval', included: true },
      { text: 'Interactive Indicative Cost Calculator', included: true },
      { text: 'Search & historical quarterly comparisons', included: true },
    ],
  },
];

const BROKER_PLANS: PlanOption[] = [
  {
    id: 'broker-preview',
    name: 'Free Preview',
    description: 'Basic access to sample market intelligence and benchmarks.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { text: 'Sample Phoenix market benchmarks', included: true },
      { text: 'Headline market overview summaries', included: true },
    ],
  },
  {
    id: 'broker-pro',
    name: 'Broker Intelligence',
    badge: 'Most Popular',
    description: 'Equip your advisory practice with market-leading commercial data.',
    monthlyPrice: 89,
    annualPrice: 69,
    features: [
      { text: 'Complete Phoenix commercial cost benchmarks', included: true },
      { text: 'Side-by-side building size comparison tool', included: true },
      { text: 'Lead-time tracking from submittal approval', included: true },
      { text: 'Manual Report-Based Cost Calculator', included: true },
      { text: 'Exportable insight summaries for client decks', included: true },
      { text: 'Verified quarterly provenance and source data', included: true },
    ],
  },
];

const ENTERPRISE_PLANS: PlanOption[] = [
  {
    id: 'enterprise-custom',
    name: 'Enterprise Cost Suite',
    badge: 'Full Organization',
    description: 'Multi-seat intelligence, historical datasets, and dedicated team support.',
    monthlyPrice: 0,
    annualPrice: 0,
    isCustom: true,
    features: [
      { text: 'Multi-seat licenses with organization workspace', included: true },
      { text: 'Full historical Phoenix quarterly cost data series', included: true },
      { text: 'Protected Source Report PDF viewer & downloads', included: true },
      { text: 'Custom dataset exports and spreadsheet imports', included: true },
      { text: 'Priority quarterly data briefing with analysts', included: true },
      { text: 'Dedicated account manager & audit logging', included: true },
    ],
  },
];

export function PlansScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    accountType,
    selectedPlanId,
    billingCycle,
    setSelectedPlanId,
    setBillingCycle,
  } = useOnboardingStore();

  const currentAccountType: AccountType = accountType ?? 'individual';

  const plans =
    currentAccountType === 'enterprise'
      ? ENTERPRISE_PLANS
      : currentAccountType === 'broker'
        ? BROKER_PLANS
        : INDIVIDUAL_PLANS;

  const [cycle, setCycle] = useState<BillingCycle>(billingCycle ?? 'monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>(
    selectedPlanId ?? plans[plans.length - 1].id,
  );

  const activePlanId = selectedPlan;
  const activePlan = plans.find((p) => p.id === activePlanId) ?? plans[0];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setSelectedPlanId(planId);
  };

  const handleToggleCycle = (newCycle: BillingCycle) => {
    setCycle(newCycle);
    setBillingCycle(newCycle);
  };

  const handleContinue = () => {
    if (activePlan.isCustom) {
      router.push('/(onboarding)/contact-sales');
    } else if (activePlan.monthlyPrice === 0) {
      router.replace('/(tabs)');
    } else {
      router.push('/(onboarding)/checkout-status');
    }
  };

  const accountTypeLabel =
    currentAccountType === 'enterprise'
      ? 'For Enterprise'
      : currentAccountType === 'broker'
        ? 'For Broker'
        : 'For Individual';

  const isAnnual = cycle === 'annual';
  const displayPrice = isAnnual ? activePlan.annualPrice : activePlan.monthlyPrice;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="dark" />

      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* ── Top Navigation Header ───────────────────────────────── */}
        <View className="px-5 pt-1 pb-3 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Go back"
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <ChevronLeft size={24} color="#0B1F3A" strokeWidth={2.2} />
          </Pressable>

          <Text className="text-[17px] font-bold text-[#0B1F3A]">
            Cost Intelligence
          </Text>

          <View className="w-10" />
        </View>

        {/* ── Scrollable Body ─────────────────────────────────────── */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-2 pb-6"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Step 2 of 2 */}
          <Text className="text-[13px] font-medium text-[#64748B] mb-1.5">
            Step 2 of 2
          </Text>

          {/* Title & Subtitle */}
          <Text className="text-[30px] font-extrabold tracking-tight text-[#0B1F3A] mb-2 leading-tight">
            Choose your plan
          </Text>
          <Text className="text-[14px] text-[#475569] leading-5 mb-5">
            Select the intelligence tier tailored to your workflow. You can upgrade, downgrade, or cancel anytime.
          </Text>

          {/* Profile Card */}
          <View className="flex-row items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E2E8F0] mb-4 shadow-sm">
            <View className="flex-row items-center">
              <View className="w-2.5 h-2.5 rounded-full bg-[#276AFF] mr-2.5" />
              <Text className="text-[13.5px] text-[#64748B]">
                Profile: <Text className="font-bold text-[#0B1F3A]">{accountTypeLabel}</Text>
              </Text>
            </View>
            <Pressable
              onPress={() => router.back()}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text className="text-[13.5px] font-bold text-[#276AFF]">Change</Text>
            </Pressable>
          </View>

          {/* Monthly / Annual Billing Toggle */}
          {currentAccountType !== 'enterprise' && (
            <View className="p-1.5 rounded-[20px] bg-[#EEF2F6] flex-row items-center mb-4">
              <Pressable
                onPress={() => handleToggleCycle('monthly')}
                className={cn(
                  'flex-1 py-3 rounded-[16px] items-center justify-center flex-row active:opacity-85',
                  cycle === 'monthly'
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent shadow-none',
                )}
              >
                <Text
                  className={cn(
                    'text-[14px]',
                    cycle === 'monthly'
                      ? 'font-bold text-[#0B1F3A]'
                      : 'font-semibold text-[#64748B]',
                  )}
                >
                  Monthly
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleToggleCycle('annual')}
                className={cn(
                  'flex-1 py-3 rounded-[16px] items-center justify-center flex-row active:opacity-85',
                  cycle === 'annual'
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent shadow-none',
                )}
              >
                <Text
                  className={cn(
                    'text-[14px]',
                    cycle === 'annual'
                      ? 'font-bold text-[#0B1F3A]'
                      : 'font-semibold text-[#64748B]',
                  )}
                >
                  Annual
                </Text>
                <View className="ml-2 bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                  <Text className="text-[10px] font-bold text-[#059669]">Save 20%</Text>
                </View>
              </Pressable>
            </View>
          )}

          {/* ── Plan Cards ────────────────────────────────────────── */}
          <View className="gap-3.5 mb-4">
            {plans.map((plan) => {
              const isSelected = plan.id === activePlanId;
              const isPaid = plan.monthlyPrice > 0;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

              return (
                <Pressable
                  key={plan.id}
                  onPress={() => handleSelectPlan(plan.id)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
                  className={cn(
                    'bg-white rounded-2xl p-5 border-[1.5px] shadow-sm',
                    isSelected
                      ? 'border-[#276AFF]'
                      : 'border-[#E2E8F0]',
                  )}
                >
                  {/* Card Header: Plan Name, Badge, Radio */}
                  <View className="flex-row items-center justify-between mb-1.5">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-[18px] font-bold text-[#0B1F3A]">
                        {plan.name}
                      </Text>
                      {plan.badge && (
                        <View className="bg-[#276AFF] px-2.5 py-0.5 rounded-full">
                          <Text className="text-white text-[11px] font-bold">
                            {plan.badge}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Radio Button */}
                    <View
                      className={cn(
                        'w-6 h-6 rounded-full items-center justify-center border-2',
                        isSelected
                          ? 'border-[#276AFF] bg-[#276AFF]'
                          : 'border-[#CBD5E1] bg-white',
                      )}
                    >
                      {isSelected && (
                        <View className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </View>
                  </View>

                  {/* Plan Description */}
                  <Text className="text-[13.5px] text-[#64748B] leading-5 mb-3">
                    {plan.description}
                  </Text>

                  {/* Price Tag Row */}
                  <View className="pb-3.5 border-b border-[#F1F5F9] flex-row items-baseline">
                    {plan.isCustom ? (
                      <Text className="text-2xl font-bold text-[#0B1F3A]">
                        Custom Quote
                      </Text>
                    ) : (
                      <View className="flex-row items-baseline flex-wrap">
                        <Text className="text-2xl font-bold text-[#0B1F3A]">
                          ${price}
                        </Text>
                        <Text className="text-[13.5px] font-normal text-[#64748B] ml-1">
                          {isPaid ? '/ month' : 'forever'}
                        </Text>
                        {isPaid && (
                          <View className="flex-row items-center ml-2">
                            <Text className="text-[#CBD5E1] mr-1.5">|</Text>
                            <Text
                              className={cn(
                                'text-[13px] font-medium',
                                isAnnual ? 'text-[#0D9488]' : 'text-[#64748B]',
                              )}
                            >
                              {isAnnual
                                ? `billed annually ($${plan.annualPrice * 12}/yr)`
                                : 'billed monthly • cancel anytime'}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>

                  {/* Feature Checklist */}
                  <View className="pt-3.5 gap-2.5">
                    {plan.features.map((feat, idx) => {
                      const checkColor =
                        isPaid && feat.included
                          ? '#0D9488'
                          : feat.included
                            ? '#64748B'
                            : '#94A3B8';

                      return (
                        <View key={idx} className="flex-row items-center gap-2">
                          <Check
                            size={14}
                            color={checkColor}
                            strokeWidth={isPaid ? 2.6 : 2.2}
                          />
                          <Text
                            className={cn(
                              'text-[13px] leading-5 flex-1',
                              feat.included
                                ? 'text-[#334155]'
                                : 'text-[#94A3B8] line-through',
                            )}
                          >
                            {feat.text}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Phoenix Data Guarantee Banner */}
          <View className="p-3.5 rounded-xl bg-[#EBF2FE] flex-row items-center gap-3 mb-4">
            <ShieldCheck size={20} color="#276AFF" strokeWidth={2} />
            <Text className="text-[12px] text-[#1E3A8A] leading-[18px] flex-1">
              <Text className="font-bold">Phoenix Data Guarantee:</Text> Official published commercial benchmarks with verified audit provenance.
            </Text>
          </View>
        </ScrollView>

        {/* ── Fixed Bottom Action Area ─────────────────────────────── */}
        <View
          className="bg-[#F8FAFC] px-5 pt-2"
          style={{ paddingBottom: Math.max(insets.bottom, 12) }}
        >
          {/* Main Blue CTA Button */}
          <Pressable
            onPress={handleContinue}
            style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}
            className="bg-[#276AFF] h-[52px] rounded-2xl flex-row items-center justify-center shadow-sm mb-3"
          >
            <Text className="text-white text-[15.5px] font-bold mr-2">
              {activePlan.isCustom
                ? 'Contact Sales'
                : activePlan.monthlyPrice === 0
                  ? 'Continue with Free Preview'
                  : `Start Subscription • $${displayPrice}/mo`}
            </Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />
          </Pressable>

          {/* Restore Purchases Link */}
          <Pressable
            onPress={() => router.push('/(onboarding)/checkout-status')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            className="flex-row items-center justify-center gap-1.5 mb-2.5"
          >
            <RotateCcw size={13} color="#276AFF" />
            <Text className="text-[12.5px] font-semibold text-[#276AFF]">
              Restore Purchases
            </Text>
          </Pressable>

          {/* Flanked Divider */}
          <View className="flex-row items-center justify-center mb-1">
            <View className="flex-1 h-[1px] bg-[#E2E8F0]" />
            <Text className="text-[11px] text-[#94A3B8] px-2 font-medium">
              Cancel anytime • Secured with 256-bit encryption
            </Text>
            <View className="flex-1 h-[1px] bg-[#E2E8F0]" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default PlansScreen;
