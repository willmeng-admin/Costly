import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ChevronLeft,
  User,
  Building2,
  Handshake,
  ArrowRight,
} from 'lucide-react-native';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import { useOnboardingStore, type AccountType } from '../../core/store/onboarding';

// React 19 JSX compatibility wrappers for react-native-svg class components
const SvgComp = Svg as unknown as React.FC<any>;
const PathComp = Path as unknown as React.FC<any>;
const RectComp = Rect as unknown as React.FC<any>;
const LineComp = Line as unknown as React.FC<any>;
const CircleComp = Circle as unknown as React.FC<any>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const ONBOARDING_SVG_TOP = isAndroid ? 52 : 30;
export const ONBOARDING_SVG_HEIGHT = isAndroid ? 212 : 190;

// ─── Background Construction & Skyline Illustration ──────────────────────────

function ConstructionBackground() {
  return (
    <View
      style={styles.bgIllustrationContainer}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <SvgComp width={230} height={ONBOARDING_SVG_HEIGHT} viewBox="0 0 230 190" fill="none">
        {/* Soft background glow circles */}
        <CircleComp cx={170} cy={60} r={80} fill="#E9F1FC" opacity={0.5} />
        <CircleComp cx={120} cy={110} r={70} fill="#F0F5FD" opacity={0.6} />

        {/* Faint distant city skyline blocks */}
        <RectComp x={10} y={115} width={22} height={75} fill="#CBD5E1" opacity={0.16} />
        <RectComp x={36} y={98} width={28} height={92} fill="#94A3B8" opacity={0.14} />
        <RectComp x={68} y={110} width={26} height={80} fill="#CBD5E1" opacity={0.18} />
        <RectComp x={98} y={85} width={36} height={105} fill="#94A3B8" opacity={0.2} />

        {/* Building frame with floor grid (under construction) */}
        <RectComp x={140} y={75} width={48} height={115} fill="#94A3B8" opacity={0.18} />
        {/* Floor slabs & columns */}
        <LineComp x1={140} y1={92} x2={188} y2={92} stroke="#94A3B8" strokeWidth={1} opacity={0.3} />
        <LineComp x1={140} y1={108} x2={188} y2={108} stroke="#94A3B8" strokeWidth={1} opacity={0.3} />
        <LineComp x1={140} y1={124} x2={188} y2={124} stroke="#94A3B8" strokeWidth={1} opacity={0.3} />
        <LineComp x1={140} y1={140} x2={188} y2={140} stroke="#94A3B8" strokeWidth={1} opacity={0.3} />
        <LineComp x1={140} y1={156} x2={188} y2={156} stroke="#94A3B8" strokeWidth={1} opacity={0.3} />
        <LineComp x1={156} y1={75} x2={156} y2={190} stroke="#94A3B8" strokeWidth={1} opacity={0.25} />
        <LineComp x1={172} y1={75} x2={172} y2={190} stroke="#94A3B8" strokeWidth={1} opacity={0.25} />

        {/* Construction Crane */}
        <LineComp x1={198} y1={35} x2={198} y2={190} stroke="#64748B" strokeWidth={1.5} opacity={0.35} />
        <LineComp x1={204} y1={35} x2={204} y2={190} stroke="#64748B" strokeWidth={1.5} opacity={0.35} />
        <LineComp x1={198} y1={50} x2={204} y2={60} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={204} y1={60} x2={198} y2={70} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={198} y1={70} x2={204} y2={80} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={204} y1={80} x2={198} y2={90} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={198} y1={90} x2={204} y2={100} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={204} y1={100} x2={198} y2={110} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />
        <LineComp x1={198} y1={110} x2={204} y2={120} stroke="#64748B" strokeWidth={0.8} opacity={0.25} />

        {/* Crane Operator Cabin & Peak */}
        <RectComp x={195} y={30} width={12} height={9} fill="#64748B" opacity={0.35} />
        <PathComp d="M 201 18 L 204 30 L 198 30 Z" fill="#64748B" opacity={0.35} />

        {/* Horizontal Crane Jib (Boom) */}
        <LineComp x1={140} y1={30} x2={228} y2={30} stroke="#64748B" strokeWidth={1.6} opacity={0.4} />
        <LineComp x1={140} y1={33} x2={228} y2={33} stroke="#64748B" strokeWidth={0.8} opacity={0.3} />

        {/* Support Cables */}
        <LineComp x1={201} y1={18} x2={150} y2={30} stroke="#64748B" strokeWidth={0.8} opacity={0.3} />
        <LineComp x1={201} y1={18} x2={175} y2={30} stroke="#64748B" strokeWidth={0.8} opacity={0.3} />
        <LineComp x1={201} y1={18} x2={224} y2={30} stroke="#64748B" strokeWidth={0.8} opacity={0.3} />

        {/* Hoist Cable and Hook */}
        <LineComp x1={162} y1={33} x2={162} y2={58} stroke="#64748B" strokeWidth={0.8} opacity={0.4} />
        <RectComp x={159} y={58} width={6} height={4} fill="#64748B" opacity={0.4} />
        <PathComp d="M 162 62 C 160 65 160 68 163 68 C 165 68 165 65 163 64" stroke="#64748B" strokeWidth={0.8} opacity={0.4} />
      </SvgComp>
    </View>
  );
}

// ─── Account Type Option Config ──────────────────────────────────────────────

interface AccountTypeConfig {
  id: AccountType;
  title: string;
  description: string;
  badge?: string;
  icon: (selected: boolean) => React.ReactNode;
}

const ACCOUNT_TYPES: AccountTypeConfig[] = [
  {
    id: 'individual',
    title: 'For Individual',
    badge: 'Most Popular',
    description: 'Track construction costs, explore market trends, and get insights.',
    icon: (selected) => (
      <User
        size={22}
        color={selected ? '#246BFF' : '#102544'}
        strokeWidth={1.9}
      />
    ),
  },
  {
    id: 'enterprise',
    title: 'For Enterprise',
    description: 'Manage costs at scale for your organization.',
    icon: (selected) => (
      <Building2
        size={22}
        color={selected ? '#246BFF' : '#102544'}
        strokeWidth={1.9}
      />
    ),
  },
  {
    id: 'broker',
    title: 'For Broker',
    description: 'Access market intelligence and share insights with your clients.',
    icon: (selected) => (
      <Handshake
        size={22}
        color={selected ? '#246BFF' : '#102544'}
        strokeWidth={1.9}
      />
    ),
  },
];

// ─── Main Screen Component ───────────────────────────────────────────────────

export function AccountTypeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { accountType, setAccountType } = useOnboardingStore();

  // Individual is initially selected by default per specifications
  const [selectedType, setSelectedType] = useState<AccountType>(
    accountType ?? 'individual',
  );

  useEffect(() => {
    if (!accountType) {
      setAccountType('individual');
    }
  }, [accountType, setAccountType]);

  const handleSelect = (type: AccountType) => {
    setSelectedType(type);
    setAccountType(type);
  };

  const handleContinue = () => {
    setAccountType(selectedType);
    router.push('/(onboarding)/plans');
  };

  return (
    <View style={styles.screenRoot}>
      <StatusBar style="dark" />

      {/* Decorative background skyline & crane in top-right */}
      <ConstructionBackground />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {/* ── Brand Header Area ───────────────────────────────────── */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Go back"
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <ChevronLeft size={22} color="#0B1F3A" strokeWidth={2.4} />
          </TouchableOpacity>

          <View style={styles.brandContainer}>
            <Text style={styles.brandTitle}>COSTLY</Text>
            <Text style={styles.brandTagline}>Cost Intelligence</Text>
          </View>
        </View>

        {/* ── Scrollable Body ─────────────────────────────────────── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Progress Indicator: slim horizontal bar + "Step 1 of 2" */}
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={styles.progressActiveBar} />
              <View style={styles.progressInactiveBar} />
            </View>
            <Text style={styles.progressText}>Step 1 of 2</Text>
          </View>

          {/* Heading and Supporting Description */}
          <Text style={styles.headingTitle}>
            {'How will you use\nCOSTLY?'}
          </Text>
          <Text style={styles.headingSubtitle}>
            {'Choose the profile that best fits your role.\nYou can update this from your account settings later.'}
          </Text>

          {/* ── Three Selection Cards ───────────────────────────────── */}
          <View style={styles.cardsContainer}>
            {ACCOUNT_TYPES.map((card) => {
              const isSelected = selectedType === card.id;

              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => handleSelect(card.id)}
                  activeOpacity={0.88}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={`${card.title}. ${card.description}`}
                  style={[
                    styles.cardContainer,
                    isSelected ? styles.cardSelected : styles.cardUnselected,
                  ]}
                >
                  {/* LEFT: Softly tinted rounded-square icon container */}
                  <View
                    style={[
                      styles.iconBox,
                      isSelected ? styles.iconBoxSelected : styles.iconBoxUnselected,
                    ]}
                  >
                    {card.icon(isSelected)}
                  </View>

                  {/* MIDDLE: Title, optional badge, and description */}
                  <View style={styles.cardMiddle}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardTitle}>{card.title}</Text>
                      {card.badge && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularBadgeText}>
                            {card.badge}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {card.description}
                    </Text>
                  </View>

                  {/* RIGHT: Circular radio indicator vertically centered */}
                  <View style={styles.radioWrapper}>
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected ? styles.radioCircleSelected : styles.radioCircleUnselected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom spacing to ensure clear clearance above fixed CTA */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* ── Fixed Bottom Continue Action Area ─────────────────────── */}
        <View
          style={[
            styles.bottomBarContainer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.88}
            style={styles.continueButton}
            accessibilityRole="button"
            accessibilityLabel="Continue to plans"
          >
            <View style={styles.continueContent}>
              <Text style={styles.continueText}>Continue</Text>
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} style={styles.continueIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
  },
  bgIllustrationContainer: {
    position: 'absolute',
    top: ONBOARDING_SVG_TOP,
    right: 0,
    width: 230,
    height: ONBOARDING_SVG_HEIGHT,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 4,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
    marginBottom: 4,
  },
  brandContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#0B1F3A',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 4.5,
  },
  brandTagline: {
    color: '#246BFF',
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginTop: 1.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: isAndroid ? 90 : 36, // 👈 Controls where the title and cards start below the header
  },

  // Progress Bar
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    transform: [
      { translateY: isAndroid ? 30 : 35 }, // 👈 ONLY moves the notch up (-) or down (+)
      { translateX: 0 },  // 👈 ONLY moves the notch left (-) or right (+)
    ],

  },
  progressTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    gap: 4,
  },
  progressActiveBar: {
    width: 58,
    height: 3.5,
    borderRadius: 999,
    backgroundColor: '#246BFF',
  },
  progressInactiveBar: {
    width: 44,
    height: 3.5,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
  },
  progressText: {
    color: '#64748B',
    fontSize: 12.5,
    fontWeight: '500',
  },

  // Heading & Subtitle
  headingTitle: {
    color: '#0B1F3A',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
    marginTop: 20,
    marginBottom: 12,
  },
  headingSubtitle: {
    color: '#5F7392',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },

  // Selection Cards
  cardsContainer: {
    gap: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 78,
  },
  cardSelected: {
    backgroundColor: '#F3F7FF',
    borderWidth: 1.5,
    borderColor: '#246BFF',
    shadowColor: '#246BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconBoxSelected: {
    backgroundColor: '#E7F0FF',
  },
  iconBoxUnselected: {
    backgroundColor: '#F1F5F9',
  },
  cardMiddle: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  cardTitle: {
    color: '#0B1F3A',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  popularBadge: {
    backgroundColor: '#246BFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#5F7392',
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 3,
  },
  radioWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#246BFF',
  },
  radioCircleUnselected: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: 'transparent',
  },
  radioDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FFFFFF',
  },

  // Bottom Continue Area
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 250, 252, 0.94)',
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.5)',
  },
  continueButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: '#276AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#276AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  continueIcon: {
    marginLeft: 8,
  },
});

export default AccountTypeScreen;
