def d(pt, k):
    for i in range(k):
        if pt > 62:
            pt = round(pt*(1-0.008))
        else:
            pt -= 1
    return pt

for i in range(1,400):
    print(d(1000, i), end=',')