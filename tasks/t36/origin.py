"""
This script parses all host_vars files, extracts IP addresses
and decides if there is a duplicate of an ip address in another files.

IP addresses that should be ignored (like gateways) are defined in 
the ip_ignore.yaml file.

Written by ChatGPT :)

"""


import argparse
import os
import re
import yaml

def parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("files", nargs="+", help="Files to check for IP duplicates")
    parser.add_argument("--ignore", action="append", help="IP addresses to ignore (can be specified multiple times)")
    parser.add_argument("--ignore-file", help="YAML file containing IP addresses to ignore")
    return parser.parse_args()

def load_ignored_ips(ignore_file):
    if not ignore_file:
        return []
    with open(ignore_file, "r") as f:
        ignore_data = yaml.safe_load(f)
        return [d["ip"] for d in ignore_data]

def find_duplicate_ips(files, ignored_ips):
    ip_regex = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
    duplicates = {}
    for filename in files:
        if not os.path.isfile(filename):
            continue
        with open(filename, "r") as f:
            for line in f:
                ips = re.findall(ip_regex, line)
                for ip in ips:
                    if ip in ignored_ips:
                        continue
                    if ip not in duplicates:
                        duplicates[ip] = [filename]
                    elif filename not in duplicates[ip]:
                        duplicates[ip].append(filename)
    return duplicates

if __name__ == "__main__":
    args = parse_arguments()
    ignored_ips = load_ignored_ips(args.ignore_file)
    if args.ignore:
        ignored_ips.extend(args.ignore)
    duplicates = find_duplicate_ips(args.files, ignored_ips)
    is_duplicity = False
    for ip, filenames in duplicates.items():
        if len(filenames) > 1:
            is_duplicity = True
            print(f"{ip} is defined multiple times in files: {', '.join(filenames)}")


    if is_duplicity:
        exit(1)
    else:
        print("No duplicate IPs found.")