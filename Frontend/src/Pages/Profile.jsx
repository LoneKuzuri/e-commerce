import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const STORE_DETAILS = [
  { icon: faUserTie, label: "Proprietors", value: "Sita Pandey & Yubraj Pangeni" },
  { icon: faCalendarDay, label: "Established", value: "2081, Baisakh 1" },
  {
    icon: faLocationDot,
    label: "Address",
    value: "Omsatiya-01, Saraswati Tol, Rupandehi",
    hint: "Opposite Hotel Sunrise",
  },
  { icon: faClock, label: "Open daily", value: "7:00 AM — 8:00 PM" },
];

const CONTACT_METHODS = [
  {
    icon: faPhone,
    label: "Call us",
    value: "+977 9857032030",
    href: "tel:+9779857032030",
    hint: "Fastest for urgent orders",
  },
  {
    icon: faWhatsapp,
    label: "WhatsApp",
    value: "+977 9857032030",
    href: "https://wa.me/9779857032030",
    hint: "Send your order list any time",
    external: true,
  },
  {
    icon: faEnvelope,
    label: "Email",
    value: "subhaom@gmail.com",
    href: "mailto:subhaom@gmail.com",
    hint: "For bulk and business enquiries",
  },
];

function Profile() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Store header */}
      <header className="animate-fade-up rounded-lg border border-border bg-primary-soft p-6 sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src="/Subha om Logo.png"
            alt=""
            className="h-16 w-16 rounded-lg bg-card object-contain p-1.5 shadow-card sm:h-20 sm:w-20"
          />
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Subha OM Enterprises
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A family-run wholesale grocery serving Omsatiya and the wider Rupandehi district with
              honest prices and dependable stock.
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Store details */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-extrabold text-card-foreground">
            Store details
          </h2>

          <dl className="mt-5 space-y-5">
            {STORE_DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <FontAwesomeIcon icon={detail.icon} className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {detail.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-card-foreground">
                    {detail.value}
                    {detail.hint && (
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {detail.hint}
                      </span>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-extrabold text-card-foreground">Get in touch</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            We reply quickest on WhatsApp during shop hours.
          </p>

          <ul className="mt-5 space-y-3">
            {CONTACT_METHODS.map((method) => (
              <li key={method.label}>
                <a
                  href={method.href}
                  {...(method.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-md border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <FontAwesomeIcon icon={method.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-foreground">{method.label}</span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {method.value}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                    {method.hint}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
        Subha OM Enterprises · Omsatiya-01, Rupandehi, Nepal · Serving the neighbourhood since 2081
      </p>
    </section>
  );
}

export default Profile;
