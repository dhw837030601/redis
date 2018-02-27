package com.dhw.testRedis;


public class ListNode {
	Integer val;
	ListNode next;

	ListNode(Integer x) {
		val = x;
	}
	public void setNext(ListNode next){
		this.next=next;
	}
	public static ListNode removeElements(ListNode head, int val) {
        // write your code here
		/*
		if(temp==null){
			return temp;
		}
		head = null;
		while(temp!=null){
			if(temp.val!=val){
				head = temp;
				break;
			}
			temp=temp.next;
    	}
		*/
		if(head==null){
			return null;
		}
		ListNode temp = null;
		ListNode newHead = null;
        while(head!=null){
        	
        	if(val!=head.val){
        		if(temp==null){
        			temp = new ListNode(head.val);
        			newHead = temp;
        		}else{
        			temp.next = new ListNode(head.val);
        			temp = temp.next;
        		}
        	}
        	head=head.next;
        }
		return newHead;
		/*if (head == null) {
            return head;
        }
        ListNode tem = null;
        while (head != null) {
            int val1 = head.val;
            if (val1 != val) {
                if (tem == null) {
                    tem = new ListNode(val1);
                } else {
                    tem.next = new ListNode(val1);
                }
            }
            head = head.next;
        }
        return tem;*/

    }
	public static void main(String[] args) {
		ListNode listNode1 = new ListNode(1);
        ListNode listNode2 = new ListNode(2);
        ListNode listNode3 = new ListNode(6);
        ListNode listNode4 = new ListNode(3);
        ListNode listNode5 = new ListNode(4);
        ListNode listNode6 = new ListNode(5);
        ListNode listNode7 = new ListNode(6);
        ListNode listNode8 = null;
        listNode1.setNext(listNode2);
        listNode2.setNext(listNode3);
        listNode3.setNext(listNode4);
        listNode4.setNext(listNode5);
        listNode5.setNext(listNode6);
        listNode6.setNext(listNode7);
        listNode7.setNext(listNode8);
        ListNode rtn = removeElements(listNode1,6);
        System.out.println(rtn);
	}
}
