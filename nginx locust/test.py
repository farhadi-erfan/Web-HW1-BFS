import time, random
from locust import HttpUser, task, between

h = { 'Content-Type': 'application/json'}

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def write(self):
        self.client.get("/go/write?l={}".format(random.randint(1, 100)))
        self.client.get("/nodejs/write?l={}".format(random.randint(1, 100)))

    #@task
    #def sha(self):
    #    n1, n2 = random.randint(1, 50000), random.randint(1, 50000)
    #    self.client.post("/go/sha256", json={"n1": n1, "n2": n2}, headers=h)
    #    self.client.post("/nodejs/sha256", json={"n1": n2, "n2": n1}, headers=h)
    #    time.sleep(1)