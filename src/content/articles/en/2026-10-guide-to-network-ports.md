---
title: "Secure The Numbers: Beginner’s Guide to Network Ports"
description: "How do machines transmit and receive data?"
showDescription: false
pubDate: 2026-10-15
authors: ["James Tablang"]
tags: ["networking"]
issue: "2026-10"
order: 2
draft: false
---

## Introduction

How do machines transmit and receive data? Physically, our computers and devices have sockets built into their hardware that connect via USB, HDMI, etc. When you put a flash drive into your computer, you’re able to access its storage. When you connect an HDMI cable to a spare display, you can project your screen onto it. And on and on. But, how is this done digitally? It’s not like every time you download an image from a website, someone sticks a cable into your device. The answer: Network Ports.

Network ports, managed by the Internet Assigned Numbers Authority (IANA), appear as a string of numbers from 0-65535 [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/) and allow devices to transmit data among each other. As such, network ports act as the docking station that lets information sail between devices, facilitating what we call the ‘internet’. More technically, network ports are how devices, including your laptop and the one writing this article, handle outgoing and incoming data. So, while your device may have an IP address that helps data locate it, the specific network port the data is directed to helps put the data in its proper place [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/). Network ports are also the reason why your device is able to browse the web, complete a download, and do numerous other things without having bits of information get mixed up [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/). Though, one might ask: how are these ports organized?

## Common Ports

Ports are separated into three distinct categories: System, Registered, and Dynamic [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/). System ports (0-1023) are the ports used for system-level operations and daily use cases:

<div class="indent">

Think about a daily task, like downloading and uploading files. This is can be done through the File Transfer Protocol (FTP), which uses Ports 20 and 21 for authentication and moving data, respectively.

</div>

Registered ports (1024-49151) are reserved by engineers and companies for their service, with some famous names being associated with the following ports:

- Port 1433, Microsoft’s SQL server database
- Port 3689, Apple’s audio access for iTunes
- Port 4195, Amazon’s go-to for audio and video streaming
- And on and on... [\[2\]](https://www.iana.org/assignments/service-names-port-numbers).

Lastly, Dynamic ports (49152-65535) are client-side, free for you, the user, to do what you will on your local machine:

<div class="indent">

Since this last category is client-sided, meaning operations happen locally on your computer, these ports are usually used to connect to the system and registered (server-sided) category of ports. Meaning, that when you try to connect to a web-page, your computer temporarily assigns one of its dynamic ports to connect to a server-sided port [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/).

</div>

Now, while ports help to connect your device to the larger network, they aren’t without risk.

## Attack Surfaces

In April of 2021, Colonial Pipeline Company, owner of the largest petroleum piping system based in the United States, was compromised by the Russian hacker group, DarkSide. The hacker group had been able to intrude on Colonial’s system via a leaked password of an outdated account tied to a VPN connection. In their quiet entry, DarkSide was able to exfiltrate a little over 100 gigabytes worth of Colonial’s data. And eventually, in May of the same year, DarkSide encrypted the company’s billing and accounting systems, forcing a complete shut down of Colonial’s pipeline and causing the price of fuel to skyrocket along the East Coast. The hacker group was finally able to acquire a ransom of approximately 4.4 million USD from the company in exchange for a decryption tool. [\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident)

Throughout the entire attack, DarkSide utilized living-off-the-land (LOTL) techniques, a methodology that targets trusted services and exploits built-in tools to compromise systems [\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident). For example, the attackers utilized network ports to stay hidden, routing exfiltration and hijacking tools over port 443, the standard for encrypted web traffic, to avoid detection [\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident). Exposed and improperly managed ports are a common and persistent Cybersecurity risk, and the reason: the network ports themselves aren’t the problem. It’s what’s listening through them and what we let walk away. So, how do we make sure that our ports stay secure and our system doesn’t get hijacked?

## Secure the Numbers

For standard and everyday use, the best security practice centers around (1) maintaining a high visibility over your network traffic and (2) minimizing your exposed ports [\[4\]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure).

Inline with the first point, high visibility allows you to clearly inspect and monitor what is occurring on your machine. To do this, consider creating a simple logging and auditing system for your computer [\[5\]](https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations). Think of this as creating a step-by-step plan for a house inspection, but instead of looking at pipes and walls, you’re looking at ports, what services are using them, and what patterns your logs reveal. Since there are many ways to do this, you can follow these general guidelines to start:

- Decide what is worth keeping track of. Think of critical events (like failed sign-ins, system permission queries, etc.) that would compromise your computer or security.
- Take steps to secure your system. Look through your system’s settings to see if there are any options that may increase security (this includes things like your system’s built-in firewall, IP address policies, public/private network usage, etc.)
- Set up built-in auditing and logging. This varies by operating system:
  - For Windows:
    - For higher tier editions, auditing policies can be edited graphically through `secpol.msc` [\[6\]](https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging). Auditing can be edited once running `secpol.msc` and finding the option under Local Policies [\[6\]](https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging).
    - For standard versions, policies can be screened by running the `auditpol` command in the terminal [\[7\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol). Policies can be found and set by adding `/get` and `/set` respectively after the `auditpol` command [\[7\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol). Also, note that you may have to run your chosen terminal as Administrator to be able to do this.
  - For MacOS:
    - Logs can be viewed in the Console application on the left sidebar [\[8\]](https://support.apple.com/guide/console/welcome/mac).
    - Additionally, logs can be viewed through Unified Logging in the terminal with the `log` command [\[9\]](https://education.apple.com/story/250014802). Generally, logs can be viewed through `log show --last {however far back you want to see}` [\[9\]](https://education.apple.com/story/250014802). More about `log` can be found by running `man log`.
- These logs should be monitored and examined regularly [\[5\]](https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations). Choose one day out of the week to review your computer’s logs and take note of anything you find suspicious.

Using these guidelines help keep you informed about the inner workings of your device, but how should you, the user, step in and start making changes to port policies? This is addressed by the second point, minimizing vulnerability by closing exposed, or otherwise unnecessarily open, ports. You can do this by:

- Learn how to view network ports directly. This varies by operating system:
  - For Windows:
    - Ports can be viewed with the `netstat` command in the terminal [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat).
    - You can use `netstat -ano | findstr LISTENING` to get a list of ports that are currently listening, meaning that they are awaiting traffic [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat).
    - Use `netstat -ano` to list ports that are actively being used and are currently open [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat).
  - For MacOS:
    - Ports can be viewed via the `lsof` command in the terminal [\[11\]](https://man.archlinux.org/man/lsof.8). Options for this command can be viewed by running `man lsof`.
    - Running the `sudo lsof -i -P -n -sTCP:LISTEN` command outputs the current ports that are actively listening, filtering ports that are awaiting network traffic [\[11\]](https://man.archlinux.org/man/lsof.8).
    - Running `sudo lsof -i -P -n` shows all open network ports [\[11\]](https://man.archlinux.org/man/lsof.8).
- Review the services and applications you need and actually use. Networks ports are used by services to transport data. If you see any active port listing an unfamiliar or unnecessary service, take note of its PID.
- Once you have a list of suspicious ports, you can start closing them. This process varies by operating system:
  - For Windows: Run `taskkill /PID {} /F`, replacing the ‘{}’ with the PID of the suspicious task you want to stop and close it’s associated port [\[12\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill).
  - For MacOS: Run `sudo kill -9 {}`, replacing the `{}` with the PID of the service you want to stop and close the port it is running on through [\[13\]](https://man.archlinux.org/man/kill.1).

To conclude, network ports are an incredible facet of modern computing that facilitate how we interact with networks as a whole. In spite of this, they also pose a considerable attack surface that hackers and threat actors can exploit. It is up to you, the user, to create measures that maintain your security in a digital landscape that constantly changes.

## References

1. GeeksForGeeks. "What is Network Port?" July 2025. https://www.geeksforgeeks.org/computer-networks/what-is-network-port/
2. Internet Assigned Numbers Authority (IANA). "Service Name and Transport Protocol Port Number Registry." October 2026. https://www.iana.org/assignments/service-names-port-numbers
3. Bellamkonda, Srikanth. "Ransomware Attacks on Critical Infrastructure: A Study of the Colonial Pipeline Incident." December 2024. https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident
4. Cybersecurity and Infrastructure Security Agency (CISA). "Enhanced Visibility and Hardening Guidance for Communications Infrastructure." December 2024. https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure
5. Australian Cyber Security Centre (ACSC). "Identifying and Mitigating Living Off the Land Techniques." February 2024. https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations
6. Microsoft Learn. "Auditing." August 2023. https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging
7. Microsoft Learn. "auditpol." February 2023. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol
8. Apple. "Console User Guide." https://support.apple.com/guide/console/welcome/mac
9. Apple EDU. "Unified Logging on Apple Devices: A Guide for Education IT." October 2025. https://education.apple.com/story/250014802
10. Microsoft Learn. "netstat." September 2026. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat
11. Arch Linux. "lsof - list open files." Revision 4.99.7. https://man.archlinux.org/man/lsof.8
12. Microsoft Learn. "taskkill." November 2024. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill
13. Arch Linux. "kill - terminate a process." September 2026. https://man.archlinux.org/man/kill.1
