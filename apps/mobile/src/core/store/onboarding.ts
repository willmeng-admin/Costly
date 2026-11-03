import { create } from 'zustand';

export type AccountType = 'individual' | 'enterprise' | 'broker';
export type BillingCycle = 'monthly' | 'annual';

interface OnboardingState {
  accountType: AccountType | null;
  selectedPlanId: string | null;
  billingCycle: BillingCycle;
  setAccountType: (type: AccountType) => void;
  setSelectedPlanId: (planId: string) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  reset: () => void;
}

/**
 * Zustand store for onboarding state.
 * Frontend-only for V1 — tracks account type and plan choice through the funnel.
 */
export const useOnboardingStore = create<OnboardingState>((set) => ({
  accountType: 'individual',
  selectedPlanId: 'individual-pro',
  billingCycle: 'monthly',
  setAccountType: (type) =>
    set({
      accountType: type,
      selectedPlanId:
        type === 'enterprise'
          ? 'enterprise-custom'
          : type === 'broker'
            ? 'broker-pro'
            : 'individual-pro',
    }),
  setSelectedPlanId: (planId) => set({ selectedPlanId: planId }),
  setBillingCycle: (cycle) => set({ billingCycle: cycle }),
  reset: () =>
    set({
      accountType: null,
      selectedPlanId: null,
      billingCycle: 'monthly',
    }),
}));
