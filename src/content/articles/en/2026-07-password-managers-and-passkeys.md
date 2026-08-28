---
title: "Password managers and passkeys, explained like you're busy"
description: "You have 80+ accounts and one tired brain. Here's how password managers and passkeys actually work, and how to start using them this week."
pubDate: 2026-07-01
authors: ["Yuki Sato"]
tags: ["passwords", "passkeys", "accounts"]
issue: "2026-07"
draft: false
demo: true
---

Let's be honest about how most of us handle passwords: one decent password, reused everywhere, with small variations when a site forces a number or a symbol. The problem isn't laziness. It's math. The average student has more than 80 accounts. No one can memorize 80 strong, unique passwords, and the websites pretending you can are the unreasonable ones.

The good news: you don't have to. Two tools solve this completely, and both are free.

## Password managers: one lock for everything

A password manager is an app that generates, stores, and fills strong passwords for you. You remember exactly **one** master password. The app remembers the rest, encrypted so that even the company running it can't read them.

"But isn't putting everything in one place risky?" It's the most common question we get, and it's a fair one. Here's the comparison that matters: right now, your reused password is effectively stored in *every* website's database, including the sketchy ones. When any one of them leaks (and they leak constantly), attackers try that same password on your email, your bank, everything. A password manager replaces "stored everywhere, cracked once, lost everywhere" with "stored in one heavily encrypted vault, unique everywhere else."

Getting started takes one evening:

1. Pick a manager. The built-in ones (iCloud Keychain, Google Password Manager) are genuinely fine. Dedicated apps like Bitwarden (free) work across all your devices.
2. Set a master password you've never used anywhere. A short sentence works great: `coffee-before-9am-is-survival`.
3. Don't migrate everything at once. Just save each login as you naturally use it. Within two weeks, your important accounts are covered.

## Passkeys: the password's retirement plan

A passkey replaces your password with your device itself. When you sign in, the site asks your phone or laptop to confirm it's you (via fingerprint, face, or PIN), and cryptography does the rest. There's nothing to remember, nothing to type, and critically, **nothing to phish**. A fake login page can't steal a passkey, because there's no secret for you to hand over. The passkey only works on the real site.

Google, Apple, Microsoft, GitHub, and a fast-growing list of others already support passkeys. When a site offers to "create a passkey," say yes. Keep the password as a backup sign-in method for now; that's normal during the transition.

## Your two-step homework

1. **Tonight:** turn on a password manager and move your email password into it. Email first, because whoever controls your email can reset everything else.
2. **This week:** add passkeys on the big accounts that offer them.

That's it. No 40-character gibberish to memorize, no notebook to lose. Future-you, staring down a "suspicious login attempt" email with total calm, says thanks.
