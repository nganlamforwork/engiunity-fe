import {
  Tabs as ShadcnuiTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface DynamicTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
}
export function Tabs({ tabs, defaultValue }: DynamicTabsProps) {
  return (
    <ShadcnuiTabs
      defaultValue={defaultValue ?? tabs[0]?.value}
      className="mt-4"
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} className="w-[120px]" value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </ShadcnuiTabs>
  );
}
