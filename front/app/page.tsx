"use client"

import { Users, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from "react";

const url = "http://localhost:8000/api/users/";
const headers = {"Content-type": "application/json"}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Array<Users>>([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  function clearState() {
    setName("")
    setEmail("")
    setPass("")
  }

  async function createUser() {
    setLoading(true)

    const response = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          name_users: name,
          password_users: pass,
          email_users: email
        }),
        headers: headers
      }
    )
    
    clearState()
    
    // const response_json = response.json()

    setLoading(false)

    return
  }
  
  // async function deleteUser(params:type) {
    
  // }
  
  // async function updateUser(params:type) {
  
  // }
  
  async function getUsers(): Promise<Users[]> {
    try {
      const response = await fetch(url)
  
      const response_json = await response.json()
      const users = response_json.data;
      
      setData(users)
      
      return users
    }
    catch {
      return []
    }
  }

  useEffect(() => {
    getUsers().then((r) => {
      setData(r)
      setLoading(false)
    })
  }, [loading])

  return (
    <div>
    {
      loading ? (
        <div className="flex flex-col space-y-3 content-center">
          <Skeleton className="h-[400px] w-[650px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      ) : (
        <div className="p-20">
        <h1 className="text-4xl">Users</h1>
        <p className="text-gray-500 font-light">Interface para visualização, criação, edição e exclusão de usúarios</p>
        <hr/>

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        
        <div className="float-right">
        <Dialog>
          <Button asChild>
          <DialogTrigger>Criar</DialogTrigger>
          </Button>
          <DialogContent>
              <DialogTitle>New User</DialogTitle>

              <Input onChangeCapture={e => setName(e.currentTarget.value)} type="name" placeholder="Name"></Input>
              <Input onChangeCapture={e => setPass(e.currentTarget.value)} type="password" placeholder="*****"></Input>
              <Input onChangeCapture={e => setEmail(e.currentTarget.value)} type="email" placeholder="Email"></Input>

              <DialogClose asChild>
                <Button onClick={createUser} variant="default">
                  Confirm
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button onClick={clearState} type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
          </DialogContent>
        </Dialog>
        </div>
        </div>
      )}
  </div>
  )
}
