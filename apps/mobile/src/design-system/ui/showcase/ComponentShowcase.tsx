/**
 * COSTLY Design System — Component Showcase
 *
 * This screen demonstrates all UI primitives in the design system.
 * It is a development-only screen; do not import this in production flows.
 *
 * To use: add a dev-only route that renders <ComponentShowcase />
 * or temporarily replace the index.tsx route for local inspection.
 *
 * Example navigation (expo-router):
 *   router.push('/ui-showcase')
 */

import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Home,
  Search,
  Settings,
  Star,
  Bell,
  ChevronRight,
  Download,
  Trash2,
} from 'lucide-react-native';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { Badge } from '../components/Badge';
import { Divider } from '../components/Divider';
import { Switch } from '../components/Switch';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { SelectableCard } from '../components/SelectableCard';
import { Avatar } from '../components/Avatar';
import { Section } from '../layouts/Section';
import { BottomActionBar } from '../layouts/BottomActionBar';
import { Loading } from '../feedback/Loading';
import { EmptyState } from '../feedback/EmptyState';
import { ErrorState } from '../feedback/ErrorState';

// ─── Sample data ──────────────────────────────────────────────────────────────

const RADIO_ITEMS = [
  { value: 'owner', label: 'Building Owner', description: 'Manage your own properties' },
  { value: 'contractor', label: 'General Contractor', description: 'Construction project management' },
  { value: 'estimator', label: 'Cost Estimator', description: 'Estimating and bid preparation' },
];

const SELECTABLE_CARDS = [
  {
    value: 'phoenix',
    title: 'Phoenix Metro',
    description: 'AZ — Updated Q4 2025',
  },
  {
    value: 'denver',
    title: 'Denver Metro',
    description: 'CO — Updated Q3 2025',
  },
  {
    value: 'dallas',
    title: 'Dallas–Fort Worth',
    description: 'TX — Updated Q4 2025',
  },
];

// ─── Showcase Section Header ──────────────────────────────────────────────────

function ShowcaseSectionHeader({ title }: { title: string }) {
  return (
    <View className="mt-8 mb-3 pb-2 border-b border-border-default">
      <Text className="text-overline text-text-tertiary font-semibold uppercase tracking-widest">
        {title}
      </Text>
    </View>
  );
}

// ─── Main Showcase ────────────────────────────────────────────────────────────

export function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('user@example.com');
  const [passwordValue, setPasswordValue] = useState('secret');
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [radioValue, setRadioValue] = useState('contractor');
  const [selectedCard, setSelectedCard] = useState('phoenix');
  const [showLoading, setShowLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-heading-xl text-navy font-bold">Design System</Text>
        <Text className="text-body-md text-text-secondary mt-1">
          COSTLY UI Component Showcase
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── BUTTONS ─────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Buttons" />

        <Section title="Variants" spacing="sm">
          <View className="gap-2">
            <Button variant="primary" onPress={() => {}}>Primary Button</Button>
            <Button variant="secondary" onPress={() => {}}>Secondary Button</Button>
            <Button variant="outline" onPress={() => {}}>Outline Button</Button>
            <Button variant="text" onPress={() => {}}>Text Button</Button>
            <Button variant="destructive" onPress={() => {}}>Destructive Button</Button>
          </View>
        </Section>

        <Section title="Sizes" spacing="sm">
          <View className="gap-2">
            <Button variant="primary" size="small" onPress={() => {}}>Small</Button>
            <Button variant="primary" size="medium" onPress={() => {}}>Medium</Button>
            <Button variant="primary" size="large" onPress={() => {}}>Large</Button>
          </View>
        </Section>

        <Section title="States" spacing="sm">
          <View className="gap-2">
            <Button variant="primary" loading onPress={() => {}}>Loading…</Button>
            <Button variant="primary" disabled onPress={() => {}}>Disabled</Button>
            <Button
              variant="primary"
              leadingIcon={<Download size={16} color="#FFFFFF" />}
              onPress={() => {}}
            >
              With Leading Icon
            </Button>
            <Button
              variant="secondary"
              trailingIcon={<ChevronRight size={16} color="#102544" />}
              onPress={() => {}}
            >
              With Trailing Icon
            </Button>
            <Button variant="primary" fullWidth onPress={() => {}}>Full Width</Button>
          </View>
        </Section>

        {/* ── INPUT ───────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Input" />

        <View className="gap-4">
          <Input
            label="Default Input"
            placeholder="Enter text here…"
            value={inputValue}
            onChangeText={setInputValue}
            helperText="This is helper text below the field."
          />
          <Input
            label="Email Address"
            placeholder="you@example.com"
            value={emailValue}
            onChangeText={setEmailValue}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry
          />
          <Input
            label="With Error"
            placeholder="Enter value"
            value=""
            onChangeText={() => {}}
            errorMessage="This field is required."
          />
          <Input
            label="Disabled"
            placeholder="Cannot edit"
            value="Read-only value"
            onChangeText={() => {}}
            disabled
          />
          <Input
            label="With Leading Icon"
            placeholder="Search…"
            value=""
            onChangeText={() => {}}
            leadingElement={<Search size={16} color="#5F7392" />}
          />
        </View>

        {/* ── CARD ────────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Card" />

        <View className="gap-3">
          <Card variant="default">
            <Text className="text-heading-md text-text-primary font-semibold">Default Card</Text>
            <Text className="text-body-md text-text-secondary mt-1">
              White surface with subtle border and shadow.
            </Text>
          </Card>
          <Card variant="outlined">
            <Text className="text-heading-md text-text-primary font-semibold">Outlined Card</Text>
            <Text className="text-body-md text-text-secondary mt-1">
              White surface with visible border, no shadow.
            </Text>
          </Card>
          <Card variant="subtle">
            <Text className="text-heading-md text-text-primary font-semibold">Subtle Card</Text>
            <Text className="text-body-md text-text-secondary mt-1">
              Very light background for secondary surfaces.
            </Text>
          </Card>
          <Card variant="default" onPress={() => {}}>
            <Text className="text-heading-md text-text-primary font-semibold">Pressable Card</Text>
            <Text className="text-body-md text-text-secondary mt-1">
              Tap me — I have an onPress handler.
            </Text>
          </Card>
        </View>

        {/* ── ICON BUTTON ─────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Icon Button" />

        <View className="flex-row gap-3 flex-wrap">
          <IconButton
            icon={<Home size={20} color="#246BFF" />}
            accessibilityLabel="Home"
            variant="filled"
          />
          <IconButton
            icon={<Bell size={20} color="#102544" />}
            accessibilityLabel="Notifications"
            variant="outline"
          />
          <IconButton
            icon={<Settings size={18} color="#5F7392" />}
            accessibilityLabel="Settings"
            variant="ghost"
            size="medium"
          />
          <IconButton
            icon={<Trash2 size={20} color="#C93636" />}
            accessibilityLabel="Delete"
            variant="outline"
            size="large"
          />
          <IconButton
            icon={<Star size={20} color="#A7B3C4" />}
            accessibilityLabel="Favorite (disabled)"
            variant="ghost"
            disabled
          />
        </View>

        {/* ── BADGE ───────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Badge" />

        <Section title="Small badges" spacing="sm">
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Neutral" variant="neutral" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Error" variant="error" />
            <Badge label="Info" variant="info" />
          </View>
        </Section>
        <Section title="Medium badges" spacing="sm">
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Neutral" variant="neutral" size="medium" />
            <Badge label="Success" variant="success" size="medium" />
            <Badge label="Warning" variant="warning" size="medium" />
            <Badge label="Error" variant="error" size="medium" />
            <Badge label="Info" variant="info" size="medium" />
          </View>
        </Section>

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Divider" />

        <View className="gap-1">
          <Text className="text-body-sm text-text-secondary">Horizontal:</Text>
          <Divider spacing="sm" />
          <Text className="text-body-sm text-text-secondary">With more spacing:</Text>
          <Divider spacing="lg" />
          <Text className="text-body-sm text-text-secondary">Vertical (in a row):</Text>
          <View className="flex-row h-8 items-center gap-3 mt-1">
            <Text className="text-body-sm text-text-primary">Left</Text>
            <Divider orientation="vertical" />
            <Text className="text-body-sm text-text-primary">Right</Text>
          </View>
        </View>

        {/* ── SWITCH ──────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Switch" />

        <Card variant="default" padding="md">
          <View className="gap-4">
            <Switch
              value={switchA}
              onValueChange={setSwitchA}
              label="Price Change Alerts"
              description="Notify me when costs shift more than 5%."
            />
            <Divider spacing="none" />
            <Switch
              value={switchB}
              onValueChange={setSwitchB}
              label="Weekly Digest"
              description="Receive a weekly summary of market updates."
            />
            <Divider spacing="none" />
            <Switch
              value={false}
              onValueChange={() => {}}
              label="Disabled Toggle"
              disabled
            />
          </View>
        </Card>

        {/* ── CHECKBOX ────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Checkbox" />

        <View className="gap-3">
          <Checkbox
            checked={checkA}
            onValueChange={setCheckA}
            label="I agree to the Terms of Service and Privacy Policy."
          />
          <Checkbox
            checked={checkB}
            onValueChange={setCheckB}
            label="Subscribe to product updates and announcements."
          />
          <Checkbox
            checked={false}
            onValueChange={() => {}}
            label="Disabled checkbox (cannot change)"
            disabled
          />
        </View>

        {/* ── RADIO ───────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Radio" />

        <Card variant="default" padding="md">
          <Radio
            items={RADIO_ITEMS}
            value={radioValue}
            onValueChange={setRadioValue}
          />
        </Card>

        {/* ── SELECTABLE CARD ─────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Selectable Card" />

        <View className="gap-2">
          {SELECTABLE_CARDS.map((card) => (
            <SelectableCard
              key={card.value}
              title={card.title}
              description={card.description}
              selected={selectedCard === card.value}
              onPress={() => setSelectedCard(card.value)}
              icon={<Text className="text-heading-md">🏙️</Text>}
            />
          ))}
        </View>

        {/* ── AVATAR ──────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Avatar" />

        <View className="flex-row gap-4 items-end flex-wrap">
          <Avatar size="small" initials="AB" />
          <Avatar size="medium" initials="JD" />
          <Avatar size="large" initials="MK" />
          <Avatar size="xlarge" initials="WM" />
          <Avatar
            size="large"
            imageUri="https://i.pravatar.cc/56"
            accessibilityLabel="User avatar"
          />
        </View>

        {/* ── SECTION LAYOUT ──────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Section Layout" />

        <Section title="Section Title" subtitle="Optional supporting description text." spacing="sm">
          <Card variant="subtle" padding="sm">
            <Text className="text-body-md text-text-secondary">Section content goes here.</Text>
          </Card>
        </Section>

        {/* ── FEEDBACK ────────────────────────────────────────────── */}
        <ShowcaseSectionHeader title="Feedback States" />

        <View className="gap-3">
          <Button
            variant="secondary"
            size="medium"
            onPress={() => setShowLoading(!showLoading)}
          >
            {showLoading ? 'Hide Loading State' : 'Show Loading State'}
          </Button>
          {showLoading && (
            <Card variant="outlined" padding="none">
              <Loading message="Loading market data…" size="large" />
            </Card>
          )}

          <Button
            variant="secondary"
            size="medium"
            onPress={() => setShowEmpty(!showEmpty)}
          >
            {showEmpty ? 'Hide Empty State' : 'Show Empty State'}
          </Button>
          {showEmpty && (
            <Card variant="outlined" padding="none">
              <EmptyState
                title="No Results Found"
                description="Try adjusting your search filters or selecting a different market."
                action={
                  <Button variant="outline" size="small" onPress={() => setShowEmpty(false)}>
                    Clear Filters
                  </Button>
                }
              />
            </Card>
          )}

          <Button
            variant="secondary"
            size="medium"
            onPress={() => setShowError(!showError)}
          >
            {showError ? 'Hide Error State' : 'Show Error State'}
          </Button>
          {showError && (
            <Card variant="outlined" padding="none">
              <ErrorState
                title="Failed to Load Data"
                description="We could not fetch cost data. Check your connection and try again."
                action={
                  <Button variant="primary" size="small" onPress={() => setShowError(false)}>
                    Try Again
                  </Button>
                }
              />
            </Card>
          )}
        </View>

        {/* ── BOTTOM PADDING ──────────────────────────────────────── */}
        <View className="h-8" />
      </ScrollView>

      {/* ── BOTTOM ACTION BAR ─────────────────────────────────────── */}
      <BottomActionBar
        primaryAction={
          <Button variant="primary" size="large" fullWidth onPress={() => {}}>
            Primary Action
          </Button>
        }
        secondaryAction={
          <Button variant="text" size="medium" fullWidth onPress={() => {}}>
            Secondary Action
          </Button>
        }
      />
    </SafeAreaView>
  );
}

