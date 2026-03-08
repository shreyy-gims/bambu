'use client'

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/20 flex items-center justify-center z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated bamboo icon */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-pulse" />
          <div className="absolute inset-1 bg-background rounded-xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 2a10 10 0 0 1 7.07 2.93" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">The Bamboo Story</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Growing something beautiful, one story at a time
          </p>
        </div>

        {/* Progress indicator */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"
            style={{
              width: '75%',
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground animate-fadeIn">Loading your journey...</p>
      </div>
    </div>
  )
}
