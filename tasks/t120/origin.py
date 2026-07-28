import random
from primelibpy import Prime as pr
from random import choice

import sys
sys.path.append("..")
from pairs import Pairs

pairs = Pairs()

#ElGamal Encryption system
#Code generated using ChatGPT

def mod_exp(base, exponent, modulus):
	result = 1
	while exponent > 0:
		if exponent % 2 == 1:
			pairs.insert(result, base)
			result = (result * base) % modulus
		pairs.insert(base, base)
		base = (base * base) % modulus
		exponent //= 2
	return result

def generate_keypair(p):
	# Choose a random private key (a) in the range [2, p-2]
	a = random.randint(2, p-2)

	# Calculate the public key (h) as h = g^a mod p
	g = random.randint(2, p-2)
	h = mod_exp(g, a, p)

	# Return public key (h, g, p) and private key (a)
	return (h, g, p), a

def encrypt(public_key, plaintext):
	h, g, p = public_key

	# Choose a random secret key (k) in the range [2, p-2]
	k = random.randint(2, p-2)

	# Calculate the ciphertext components
	c1 = mod_exp(g, k, p)
	s = mod_exp(h, k, p)
	pairs.insert(s, plaintext)
	c2 = (s * plaintext) % p

	# Return the ciphertext (c1, c2)
	return c1, c2

def decrypt(public_key, private_key, ciphertext):
	h, g, p = public_key
	c1, c2 = ciphertext

	# Calculate the shared secret key (s) as s = c1^a mod p
	s = mod_exp(c1, private_key, p)

	# Calculate the multiplicative inverse of s (mod p)
	s_inv = pow(s, -1, p)

	# Decrypt the plaintext as m = c2 * s_inv mod p
	pairs.insert(c2, s_inv)
	plaintext = (c2 * s_inv) % p

	return plaintext

for i in range(1000):
	pms = pr.getGoodPrime(100, 256)
	p = choice(pms)

	public_key, private_key = generate_keypair(p)

	message = random.randrange(5, 50)
	print("Original Message:", message)

	ciphertext = encrypt(public_key, message)
	print("Encrypted Message:", ciphertext)

	decrypted_message = decrypt(public_key, private_key, ciphertext)
	print("Decrypted Message:", decrypted_message)

pairs.pkl_dump()
print(pairs)
print(f"max: {pairs.get_max_val()}")