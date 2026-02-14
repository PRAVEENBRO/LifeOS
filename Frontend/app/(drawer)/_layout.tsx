import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      {/* This mounts the Tabs navigator inside Drawer */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
        }}
      />
    </Drawer>
  );
}
