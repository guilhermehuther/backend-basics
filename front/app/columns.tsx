"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react";

const url = "http://localhost:8000/api/users";
const headers = {"Content-type": "application/json"}

export type Users = {
  id_users: string
  password_users: number
  name_users: string
  email_users: string
  created_at_users: string
}

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id_users",
    header: "ID",
  },
  {
    accessorKey: "password_users",
    header: "Password",
  },
  {
    accessorKey: "name_users",
    header: "Name",
  },
  {
    accessorKey: "email_users",
    header: "Email",
  },
  {
    accessorKey: "created_at_users",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => {
      const [loading, setLoading] = useState(false)

      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [pass, setPass] = useState("")
    
      function clearState() {
        setName("")
        setEmail("")
        setPass("")
      }

      async function updateUser() {
        setLoading(true)

        const response = await fetch(
          `${url}/${row.original.id_users}`,
          {
            method: "PUT",
            body: JSON.stringify({
              new_name_users: name,
              new_password_users: pass,
              new_email_users: email
            }),
            headers: headers
          }
        )
        
        clearState()
        
        setLoading(false)
        
        window.location.reload()
      }

      return (
          <div className="flex justify-between">
            <Dialog>
              <Button 
                className="mr-2 w-full" 
                variant="secondary"
                asChild
              >
              <DialogTrigger>
                { 
                  loading ? (
                    <Spinner/>
                  ) :
                  <p>Editar</p>
                }
              </DialogTrigger>
              </Button>
              <DialogContent>
                <DialogTitle>Edit User</DialogTitle>
    
                <Input onChangeCapture={e => setName(e.currentTarget.value)} type="name" placeholder="Name"></Input>
                <Input onChangeCapture={e => setPass(e.currentTarget.value)} type="password" placeholder="*****"></Input>
                <Input onChangeCapture={e => setEmail(e.currentTarget.value)} type="email" placeholder="Email"></Input>

                <DialogClose asChild>
                  <Button onClick={updateUser} variant="default">
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
            <Button 
              className="w-full"
              onClick={
                async () => {
                  setLoading(true)
                  await fetch(`${url}/${row.original.id_users}`, {method: "DELETE"})
                  setLoading(false)
                  window.location.reload()
                }
              } 
              variant="destructive"
            >              
              { 
                loading ? (
                  <Spinner/>
                ) :
                <p>Excluir</p>
              }
            </Button>
          </div>
      )
    }
  }
]
