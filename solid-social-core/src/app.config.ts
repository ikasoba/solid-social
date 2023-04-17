export interface AppConfig {
  instanceName: string;
  saltRounds: number;
}

export const getAppConfig = (): AppConfig => ({
  instanceName: process.env["INSTANCE_NAME"] ?? "solid-social",
  saltRounds: parseInt(process.env["SALT_ROUNDS"] ?? "10"),
});
