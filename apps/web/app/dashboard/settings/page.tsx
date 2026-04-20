export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground text-sm">
          Configure API endpoints, model weights, and integration preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border bg-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Inference Engine</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Model Selection</label>
              <select className="bg-background border p-2 text-sm w-full max-w-sm">
                <option>AgriNN-Vision-v4.2 (Default)</option>
                <option>AgriNN-Vision-v4.0 (Legacy)</option>
                <option>AgriNN-Fast-Edge</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Confidence Threshold</label>
              <input
                type="number"
                defaultValue="85"
                className="bg-background border p-2 text-sm w-full max-w-sm"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium border border-primary mt-4">
            Save Engine Settings
          </button>
        </div>

        <div className="border bg-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Irreversible actions that affect your stored analysis data.
          </p>
          <button className="px-4 py-2 bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground transition-colors">
            Purge All Records
          </button>
        </div>
      </div>
    </div>
  );
}
