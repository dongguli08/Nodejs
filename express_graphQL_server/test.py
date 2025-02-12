# a, b, c = map(int, input().split())  # 현재 시, 분, 초 입력
# d = int(input())  # 추가할 초 입력

# # d를 시, 분, 초로 변환
# hours = d // 3600  
# minutes = (d % 3600) // 60  
# seconds = d % 60  

# # 현재 시간에 더하기
# answer1 = a + hours  
# answer2 = b + minutes  
# answer3 = c + seconds  

# # 초가 60 이상이면 분 증가
# if answer3 >= 60:
#     answer2 += 1
#     answer3 -= 60

# # 분이 60 이상이면 시간 증가
# if answer2 >= 60:
#     answer1 += 1
#     answer2 -= 60

# # 24시간제 적용
# answer1 %= 24  

# print(answer1, answer2, answer3)


# weight = float(input())
# height = float(input())

# bmi = weight / (height * height)

# if bmi >= 25:
#     print('Overweight')

# elif 18.5 <= bmi <= 25.0:
#     print('Normal weight')

# else:  # bmi < 18.5인 경우
#     print('Underweight')


# 2857
# result = []
# for i in range(1,6):
#     S = input()
#     if "FBI" in S:
#         result.append(i)
# if len(result) == 0:
#     print("HE GOT AWAY!")
# else:
#     print(*result)


# 11006번
# T = int(input())

# for i in range(T):
#     N, M = map(int, input().split())
#     leg = M * 2 - N
#     print(leg, M - leg)

# 모든 닭의수 곱하기 2는 모든 닭의 다리수 에서 다리수의 합을 빼면 다리가 한개인 닭의수 가 나옴

# while(True):
#     a,b=map(int,input().split())
#     if(a==0 and b==0):
#         break
#     answer = a+b
#     print(answer)

# answer = []    
# for i in range(5):
#     a = int(input())
#     if a < 40:
#         a = 40
#     answer.append(a)
    
# average = sum(answer) / len(answer)  
# print(int(average))


t = int(input())

for _ in range(t):
    n, m = input().split()
    n = float(n)

    if m == "kg":
        print(f"{n*2.2046:0.4f} lb")
    elif m == "lb":
        print(f"{n*0.4536:0.4f} kg")
    elif m == "l":
        print(f"{n*0.2642:0.4f} g")
    else:
        print(f"{n*3.7854:0.4f} l")