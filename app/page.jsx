import Calculator from "@/components/Calculator";

const tools = [
  ["SIP", "Monthly investing, compounded", true],
  ["Home loan EMI", "What you pay, and how much is interest", true],
  ["Fixed deposit", "Maturity after tax", false],
  ["Income tax", "Old vs new regime", false],
  ["Salary take-home", "CTC to in-hand", false],
  ["Retirement", "How big a corpus you need", false],
];

const promises = [
  ["Formulas stay visible", "Open any calculator and see the equation, your inputs and every assumption. No black boxes."],
  ["Nothing to sell you", "Fermor does not sell funds, FDs or insurance, so no product gets nudged your way."],
  ["No login, no paywall", "Open a tool, get the answer. The site is supported by ads and partnerships, never by your data."],
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#" className="font-display text-2xl font-extrabold">Fermor</a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#tools" className="hidden text-mute hover:text-ink sm:block">Tools</a>
          <a href="#honest" className="hidden text-mute hover:text-ink sm:block">How we work</a>
          <a href="#tools" className="rounded-full bg-ink px-4 py-2 font-medium text-white">Try a calculator</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
          <div className="rise">
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Money decisions, with the math showing.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              Free calculators for SIPs, loans, tax and salary, built for how India actually saves and borrows. Try one on the right.
            </p>
            <p className="mt-8 max-w-md border-l-4 border-sun pl-4 text-sm text-mute">
              Banks publish the schedule as a PDF. Fermor lets you move the sliders and watch it change.
            </p>
          </div>
          <div className="rise" style={{ animationDelay: ".15s" }}><Calculator /></div>
        </section>

        <section id="tools" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Pick what you are planning</h2>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(([name, line, live]) => (
              <li key={name} className="flex items-start justify-between gap-3 border-t border-ink/15 py-5">
                <div>
                  <h3 className="font-display text-xl font-semibold">{name}</h3>
                  <p className="mt-1 text-sm text-mute">{line}</p>
                </div>
                <span className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${live ? "bg-leaf text-white" : "bg-ink/10 text-mute"}`}>
                  {live ? "Live above" : "Soon"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="honest" className="bg-ink py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">You decide. We only do the arithmetic.</h2>
            <dl className="space-y-8">
              {promises.map(([t, d]) => (
                <div key={t}>
                  <dt className="font-display text-xl font-semibold text-sun">{t}</dt>
                  <dd className="mt-1 max-w-lg leading-relaxed text-white/75">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm text-mute">
        <p className="max-w-2xl">
          Fermor is an education and calculator service. It is not a SEBI-registered investment adviser, an AMFI-registered distributor or an IRDAI-registered insurance agent. Results are estimates based on the inputs you give.
        </p>
        <p className="mt-3">© 2026 Fermor. This page is an assignment redesign.</p>
      </footer>
    </>
  );
}
