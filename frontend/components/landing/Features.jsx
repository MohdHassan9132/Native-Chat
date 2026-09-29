import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    title: "Chats",
    description:
      "Real-time one-to-one conversations with live typing presence, instant read receipts, and seamless offline message persistence.",
    iconBg: "bg-brand-cyan",
    iconColor: "text-brand-charcoal",
    statLabel: "Sub-millisecond latency",
    statValue: "⚡ Sockets",
    statColor: "text-brand-cyanDark",
    path: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "Groups",
    description:
      "Bring your people together in group conversations. Easily manage group permissions, member invitations, and broadcast channels.",
    iconBg: "bg-brand-coral",
    iconColor: "text-white",
    statLabel: "High-concurrency rooms",
    statValue: "👥 Up to 500",
    statColor: "text-brand-coral",
    path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Calls",
    description:
      "Audio and video calls whenever you need them. Powered by WebRTC peer-to-peer encryption with crystal-clear voice clarity.",
    iconBg: "bg-brand-yellow",
    iconColor: "text-brand-charcoal",
    statLabel: "WebRTC Audio & Video",
    statValue: "📞 HD Quality",
    statColor: "text-brand-charcoal",
    path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "Media",
    description:
      "Share photos, videos and recorded audio without harsh compression. Built-in interactive lightbox and rapid thumbnail generation.",
    iconBg: "bg-white",
    iconColor: "text-brand-cyanDark",
    statLabel: "Direct stream upload",
    statValue: "📷 Zero Loss",
    statColor: "text-brand-cyanDark",
    path: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Status",
    description:
      "Share moments that disappear after 24 hours. Post daily thoughts, snapshot photos, and see view counts in an ephemeral feed.",
    iconBg: "bg-brand-cyanLight",
    iconColor: "text-brand-coral",
    statLabel: "Self-expiring stories",
    statValue: "⏳ 24 Hours",
    statColor: "text-brand-coral",
    path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Pinned Chats",
    description:
      "Keep important conversations right where you need them. Pin frequent colleagues, active family groups, and quick drafts to the top.",
    iconBg: "bg-brand-coralLight",
    iconColor: "text-brand-charcoal",
    statLabel: "Sticky priorities",
    statValue: "📌 Instant Access",
    statColor: "text-brand-charcoal",
    path: "M16 12V4H17V2H7V4H8V12L5 15V17H11V22L12 23L13 22V17H19V15L16 12Z",
    fill: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-b-2 border-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-brand-cyanLight text-brand-charcoal font-bold text-xs uppercase tracking-wider rounded-md ink-border mb-3">
            BUILT-IN CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Everything You Need to Stay Connected
          </h2>
          <p className="mt-4 text-neutral-600 font-medium text-base sm:text-lg">
            Crafted with complete native mobile architecture, from
            socket-driven real-time streams to WebRTC media engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              index={i + 1}
              title={feature.title}
              description={feature.description}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
              statLabel={feature.statLabel}
              statValue={feature.statValue}
              statColor={feature.statColor}
              icon={
                <svg
                  className="w-7 h-7"
                  fill={feature.fill ? "currentColor" : "none"}
                  stroke={feature.fill ? "none" : "currentColor"}
                  strokeWidth={feature.fill ? undefined : "2"}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d={feature.path}
                    strokeLinecap={feature.fill ? undefined : "round"}
                    strokeLinejoin={feature.fill ? undefined : "round"}
                  />
                </svg>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
